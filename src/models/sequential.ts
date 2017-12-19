import { Layer, Loss, Optimizer } from '../';

import { Graph, Tensor, Session, CostReduction, NDArrayMath, NDArrayMathCPU, NDArrayMathGPU, SGDOptimizer, Scalar, Array1D, InCPUMemoryShuffledInputProviderBuilder, util } from 'deeplearn';
import { AdamOptimizer, AdamaxOptimizer, AdadeltaOptimizer, AdagradOptimizer, MomentumOptimizer } from 'deeplearn';
import { Array4D, Array2D, Array3D, NDArray } from 'deeplearn/dist/math/ndarray';


/**
 * Linear stack of layers.
 */
export class Sequential{
    public model: Layer[] = [];

    public stats: {
        compiled: boolean,
        cost: Scalar,
        loss: number,
        epochsRun: number
    } = {
        compiled: false,
        cost: null,
        loss: 1,
        epochsRun: 0
    }

    private deeplearn: {
        graph?: Graph,
        inputTensor?: Tensor,
        targetTensor?: Tensor,
        predictionTensor?: Tensor,
        costTensor?: Tensor,
        session?: Session,
        math?: NDArrayMath,
        optimizer?: any
    } = {};

    constructor(model?: Layer[]){
        this.stats.compiled = false;
        if(model) model.forEach(layer => this.add(layer));
    }

    add(layer: Layer){
        this.stats.compiled = false;
        this.model.push(layer);
    }

    compile(options: {
        optimizer?: Optimizer | string,
        loss?: Loss | string
    }){
        // Defaults
        options.optimizer = options.optimizer || 'SGD';
        options.loss = options.loss || 'meanSquared';
        // String or an Object accepted
        options.optimizer = (typeof(options.optimizer) == 'string') ? new Optimizer(options.optimizer) : options.optimizer;
        options.loss = (typeof(options.loss) == 'string') ? new Loss(options.loss) : options.loss;

        // Init deeplearn.js model
        let dl = this.deeplearn;
        dl.math = (typeof window === 'undefined') ? new NDArrayMathCPU() : new NDArrayMathGPU();
        dl.graph = new Graph();
        
        // This tensor contains the input
        if(this.model[0].constructor.name !== 'Input') throw ('First layer must be an Input layer.');
        let inputDims:number[] = this.model[0].units as number[];
        dl.inputTensor = dl.graph.placeholder('input', inputDims);
        
        // This tensor contains the target
        if(this.model[this.model.length-1].constructor.name !== 'Output') throw ('Last layer must be an Output layer.')
        let outputDims: number[] = this.model[this.model.length-1].units as number[];
        dl.targetTensor = dl.graph.placeholder('output', outputDims);

        // Hidden layers
        let prevLayer = dl.inputTensor;
        let prevLayerDims: number[] = inputDims;
        for(let i=1; i<(this.model.length-1);i++){
            let layer = this.model[i];
            switch(layer.constructor.name){
                case 'Dense':
                prevLayerDims = layer.units as number[];
                prevLayer = dl.graph.layers.dense(
                    `layer-${i}`, prevLayer, layer.units as number);
                // Use embedded Activation if available
                if(layer.options.activation) {
                    let activation = this.convertToDeeplearnActivation(prevLayer, layer.options.activation);
                    if(activation) prevLayer = activation;
                }
                break;
                
                case 'Activation':
                let activation = this.convertToDeeplearnActivation(prevLayer, layer);
                if(activation) prevLayer = activation;
                break;

                case 'MaxPooling2D':
                prevLayerDims = layer.units as number[];
                prevLayer = dl.graph.maxPool(prevLayer, layer.units as number, layer.options.stride, layer.options.zeroPad);
                break;
                
                case 'Conv2D':
                prevLayerDims = layer.units as number[];
                prevLayer = this.convertToDeeplearnConv2D(
                    prevLayer,
                    layer.units as number, layer.options.stride, layer.options.zeroPad, layer.options.outputDepth,
                    prevLayerDims as number[], i
                );
                 // Use embedded Activation if available
                 if(layer.options.activation) {
                    let activation = this.convertToDeeplearnActivation(prevLayer, layer.options.activation);
                    if(activation) prevLayer = activation;
                }
                break;

                case 'Flatten':
                prevLayer = dl.graph.reshape(prevLayer, [util.sizeFromShape(prevLayerDims as number[])]); 
                break;

                case 'Reshape':
                prevLayer = dl.graph.reshape(prevLayer, layer.units as number[]); 
                break;

                default:
                throw ('Unknown layer type: '+layer.constructor.name);
            }
        
        }

        // This tensor contains the predictions
        dl.predictionTensor = dl.graph.layers.dense('prediction', prevLayer, outputDims[0]);

        // Add a cost tensor that specifies the loss function
        dl.costTensor = this.getCostFunction(options.loss);

        // TODO: use Optimizer class .type here:
        dl.optimizer = this.getOptimizer(options.optimizer);
        
        // Session
        dl.session = new Session(dl.graph, dl.math);
        
        this.stats.compiled = true;
    }



    async fit(options:{
        input: any[],
        target: any[],

        batchSize?: number,
        epochs?: number,
        verbose?: number,
        validationSplit?: number,
        shuffle?: boolean // TODO: use this -- now always Shuffles
    }){
        this.log('Start fit');
        // Sanity check
        if(!options.input.length || !options.target.length) throw('Missing input/target Arrays.');
        let inputDims       = this.getDims(options.input[0]);
        let modelInputDims  = this.model[0].units as number[];
        let targetDims      = this.getDims(options.target[0]);
        let modelTargetDims = this.model[this.model.length-1].units as number[];
        if(!this.isEqual(inputDims, modelInputDims)) throw(`Wrong dimensions for inputs: model has shape [${modelInputDims}], but input has shape [${inputDims}].`);
        if(!this.isEqual(targetDims, modelTargetDims)) throw(`Wrong dimensions for targets: model has shape [${modelTargetDims}], but target has shape [${targetDims}].`);
        
        // Defaults
        options.batchSize = options.batchSize || 32;
        options.epochs = options.epochs || 1;
        options.verbose = options.verbose || 1;
        options.validationSplit = options.validationSplit || 0.0;
        if (typeof(options.shuffle) == 'undefined') options.shuffle = true;

        const timeStart: number = new Date().valueOf();

        const inputArray = options.input.map(el => this.convertToDeeplearnArray(el));
        const targetArray = options.target.map(el => Array1D.new(el));
        const shuffledInputProviderBuilder =
            new InCPUMemoryShuffledInputProviderBuilder([inputArray, targetArray]);
        const [inputProvider, targetProvider] =
            shuffledInputProviderBuilder.getInputProviders();
        const feedEntries = [
            {tensor: this.deeplearn.inputTensor, data: inputProvider},
            {tensor: this.deeplearn.targetTensor, data: targetProvider}
        ];

        // TODO: check Keras, move to an option?
        let logInterval = 20;
        await this.deeplearn.math.scope(async () => {
            for (let i = 0; i < options.epochs; i++) {
                this.stats.epochsRun = i; // TODO: enable pause & continue
                this.stats.cost = this.deeplearn.session.train(
                    this.deeplearn.costTensor, feedEntries, 4, this.deeplearn.optimizer, CostReduction.MEAN); //TODO: costreduction must be configurable!
                if((i % logInterval) === 0){
                    this.stats.loss = await this.stats.cost.val();
                    this.log(`Epoch: ${i}/${options.epochs}, Loss: ${this.stats.loss}.`);
                }
            }
            this.stats.loss = await this.stats.cost.val();
        });

        const timeEnd: number = new Date().valueOf();
        const time = timeEnd - timeStart;

        this.log(`Epoch: ${options.epochs}/${options.epochs}, Loss: ${this.stats.loss}.`);
        this.log(`Took ${time}ms.`);
        return true;

    }

    async predict(options:{
        input: any[],
        batchSize?: number,
        verbose?: number
    }):Promise<Float32Array | Int32Array | Uint8Array>{
        options.batchSize = options.batchSize || 32;
        options.verbose = options.verbose || 1;

        const inputArray = this.convertToDeeplearnArray(options.input);
        const val = this.deeplearn.session.eval(this.deeplearn.predictionTensor, 
            [{tensor: this.deeplearn.inputTensor, data: inputArray}]);

        return val.data();
    }

    private log(...msg:string[]): void{
        console.log(msg);
    }

    private convertToDeeplearnArray(arr: number[]): NDArray{
        let dims = this.getDims(arr);
        let dlArray;
        switch(dims.length){
            case 1:
            dlArray = Array1D.new(arr);
            break;
            case 2:
            dlArray = Array2D.new(dims as [number,number], arr);
            break;
            case 3:
            dlArray = Array3D.new(dims as [number,number,number], arr);
            break;
            case 4:
            dlArray = Array4D.new(dims as [number,number,number,number], arr);
            break;
            default:
            throw(`Unknown dimensionality for array: ${arr}`)
        }
        return dlArray;
    }

    private getCostFunction(loss: Loss){
        let dl = this.deeplearn;
        switch(loss.type.toUpperCase()){
            case 'MEANSQUARED':
            return this.deeplearn.graph.meanSquaredCost(dl.targetTensor, dl.predictionTensor);
            case 'SOFTMAXCROSSENTROPY':
            return this.deeplearn.graph.softmaxCrossEntropyCost(dl.targetTensor, dl.predictionTensor);
            default:
            throw ('Unknown Cost function: '+loss.type);
        }
    }

    private getOptimizer(optimizer: Optimizer){
        switch(optimizer.type.toUpperCase()){
            case 'SGD':
            return new SGDOptimizer(optimizer.options.learningRate);

            case 'ADAGRAD':
            return new AdagradOptimizer(optimizer.options.learningRate);

            case 'ADADELTA':
            return new AdadeltaOptimizer(optimizer.options.learningRate, optimizer.options.gamma);

            case 'ADAM':
            return new AdamOptimizer(optimizer.options.learningRate, optimizer.options.beta1, optimizer.options.beta2);

            case 'ADAMAX':
            return new AdamaxOptimizer(optimizer.options.learningRate, optimizer.options.beta1, optimizer.options.beta2);

            case 'MOMENTUM':
            return new MomentumOptimizer(optimizer.options.learningRate, optimizer.options.momentum);

            default:
            throw ('Unknown Optimizer: '+optimizer.type);
        }
    }


    private convertToDeeplearnActivation(x:Tensor, kerasActivation: Layer):Tensor{
        switch(kerasActivation.type.toUpperCase()){
            case 'SOFTMAX':
            return (this.deeplearn.graph.softmax(x));
            case 'ELU':
            return (this.deeplearn.graph.elu(x));
            case 'RELU':
            return (this.deeplearn.graph.relu(x));
            case 'TANH':
            return (this.deeplearn.graph.tanh(x));
            case 'SIGMOID':
            return (this.deeplearn.graph.sigmoid(x));
            
            case 'LEAKYRELU':
            return this.deeplearn.graph.leakyRelu(x, kerasActivation.options.alpha);

            case 'LINEAR':
            // OMIT (linear does nothing)
            return (null);

            // Unsupported - could not find in deeplearn.js
            case 'SOFTPLUS':
            case 'SOFTSIGN':
            case 'SELU':
            throw ('Unsupported Activation type: '+kerasActivation.type);
            default:
            throw ('Unknown Activation type: '+kerasActivation.type);
        }
    }

    // TODO: check prevlayer vs layer???

    private convertToDeeplearnConv2D(
        prevLayer: Tensor, 
        fieldSize:number, stride:number, zeroPad:number, outputDepth:number,
        inputShape: number[], index: number): Tensor {
        const wShape: [number, number, number, number] =
            [fieldSize, fieldSize, inputShape[2], outputDepth];
        let w: Array4D;
        let b: Array1D;

        w = Array4D.randTruncatedNormal(wShape, 0, 0.1);
        b = Array1D.zeros([outputDepth]);

        const wTensor = this.deeplearn.graph.variable(`conv2d-${index}-w`, w);
        const bTensor = this.deeplearn.graph.variable(`conv2d-${index}-b`, b);
        return this.deeplearn.graph.conv2d(
            prevLayer, wTensor, bTensor, fieldSize, outputDepth,
            stride, zeroPad);
    }

    private getDims(arr: number[] | number): number[]{
        return arr instanceof Array ? [arr.length].concat(this.getDims(arr[0])) : [];
    }
    private isEqual(arr1: any[], arr2: any[]): boolean{
        return (JSON.stringify(arr1) == JSON.stringify(arr2));
    }
  

}