import { Layer } from '../';
import { Optimizer, Optimizers } from '../';
import { Loss, Losses } from '../';


import { Graph, Session, CostReduction, NDArrayMathCPU, NDArrayMathGPU, Scalar, Array1D, InCPUMemoryShuffledInputProviderBuilder,InGPUMemoryShuffledInputProviderBuilder, util } from 'deeplearn';

import { DeeplearnConverter, DeeplearnModel } from './deeplearn-converter';


/**
 * The Sequential model is a linear stack of layers.
 */
export class Sequential{

    /**
     * @param stats.compiled The model is compiled succesfully.
     * @param stats.cost Method .fit() will save progress here as a Scalar. Use stats.loss instead.
     * @param stats.loss The loss of the model as a float (0...1). Use this to display the error.
     * @param stats.epochsRun The number of iterations already run.
     */
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

    // The Layers as an Array.
    private model: Layer[] = [];
    private deeplearn: DeeplearnModel = {}



    /**
     * Constructor - a new Sequential model.
     * @param model Optionally, you can provide the Layers as an Array.
     *      Or, you can instantiate an empty model with:
     *      <pre>let model = new Sequential();
            // And then add layers:
            model.add(Layers.input(2));
            model.add(Layers.dense(8));
            model.add(Layers.activation('relu'));
            model.add(Layers.output(1));</pre>
     */
    constructor(model?: Layer[]){
        this.stats.compiled = false;
        if(model) model.forEach(layer => this.add(layer));
    }
    
    /**
     * Convert the Sequential model to JSON.
     * <pre>let jsonString = model.toJSON();</pre>
     * The generated JSON file is human-readable and can be manually edited if needed.
     * You can build a fresh model from this data calling the static .fromJSON() later.
     * @TODO this will later also support saving the weights.
     * @returns The architecture of the model as a string.
     */
    toJSON():string {
        return JSON.stringify(this.model);
    }
    /**
     * Create a new Sequential model from JSON.
     * <pre>let model: Sequential = Sequential.fromJSON(jsonString);</pre>
     * The generated JSON file is human-readable and can be manually edited if needed.
     * TODO: this will later also support loading weights.
     * @param model The architecture of the model as a string.
     * @returns A new Sequential model.
     */
    static fromJSON(model: string):Sequential {
        return new Sequential(JSON.parse(model));
    }
    /**
     * Add a layer to the Sequential model.
     * @param layer The layer to add
     */
    add(layer: Layer):void {
        this.stats.compiled = false;
        this.model.push(layer);
    }

    /**
     * Configures the model for training.
     * @param options.optimizer Optimizer object. See Optimizers class.
     * @param options.loss Loss object. See Losses class.
     */
    compile(options?: {
        optimizer?: Optimizer,
        loss?: Loss
    }):void{
        // Defaults
        options = options || {};

        options.optimizer = options.optimizer || Optimizers.sgd();
        
        options.loss = options.loss || Losses.meanSquared();


        // Init deeplearn.js model
        let dl = this.deeplearn;
        dl.math = (typeof window === 'undefined') ? new NDArrayMathCPU() : new NDArrayMathGPU();
        console.log(dl.math);
        dl.graph = new Graph();
        
        // This tensor contains the input
        if(this.model[0].type !== 'input') throw ('First layer must be an Input layer.');
        let inputDims:number[] = this.model[0].units as number[];
        dl.inputTensor = dl.graph.placeholder('input', inputDims);
        
        // This tensor contains the target
        if(this.model[this.model.length-1].type !== 'output') throw ('Last layer must be an Output layer.')
        let outputDims: number[] = this.model[this.model.length-1].units as number[];
        dl.targetTensor = dl.graph.placeholder('output', outputDims);

        // Hidden layers
        let prevLayer = dl.inputTensor;
        for(let i=1; i<(this.model.length-1);i++){
            let layer = this.model[i];
            switch(layer.type){
                case 'dense':
                prevLayer = dl.graph.layers.dense(
                    `layer-${i}`, prevLayer, layer.units as number);
                // Use embedded Activation if available
                if(layer.options.activation) {
                    let activation = DeeplearnConverter.convertToDeeplearnActivation(this.deeplearn, prevLayer, layer.options.activation);
                    if(activation) prevLayer = activation;
                }
                break;
                
                case 'activation':
                let activation = DeeplearnConverter.convertToDeeplearnActivation(this.deeplearn, prevLayer, layer);
                if(activation) prevLayer = activation; // skip linear
                break;

                case 'maxPooling2D':
                prevLayer = dl.graph.maxPool(prevLayer, layer.units as number, layer.options.stride, layer.options.zeroPad);
                break;
                
                case 'conv2D':
                prevLayer = DeeplearnConverter.convertToDeeplearnConv2D(
                    this.deeplearn,
                    prevLayer,
                    layer.units as number, layer.options.stride, layer.options.zeroPad, layer.options.outputDepth,
                    prevLayer.shape, i
                );
                 // Use embedded Activation if available
                 if(layer.options.activation) {
                    let activation = DeeplearnConverter.convertToDeeplearnActivation(this.deeplearn, prevLayer, layer.options.activation);
                    if(activation) prevLayer = activation;
                }
                break;

                case 'flatten':
                prevLayer = dl.graph.reshape(prevLayer, [util.sizeFromShape(prevLayer.shape)]);
                break;

                case 'reshape':
                prevLayer = dl.graph.reshape(prevLayer, layer.units as number[]); 
                break;

                default:
                throw ('Unknown layer type: '+layer.type);
            }
        
        }

        // This tensor contains the predictions
        dl.predictionTensor = dl.graph.layers.dense('prediction', prevLayer, outputDims[0]);

        // Add a cost tensor that specifies the loss function
        dl.costTensor = DeeplearnConverter.createCostFunction(dl, options.loss);

        // TODO: use Optimizer class .type here:
        dl.optimizer = DeeplearnConverter.createOptimizer(options.optimizer);
        
        // Session
        dl.session = new Session(dl.graph, dl.math);
        
        this.stats.compiled = true;
    }


    /**
     * Trains the model for a fixed number of epochs: iterations on the dataset.
     * @param options.input Array of training data. Mandatory.<br>
     * @param options.target Array of target (label) data. Mandatory.<br>
     * @param options.batchSize Number of samples per gradient update. If unspecified, it will default to 32.<br>
     * @param options.epochs Number of epochs to train. Each epoch is an iteration over the entire input and target data provided. If unspecified, it will default to 1.<br>
     * @param options.log Number of epochs to run between logging. 0 = silent. 10 = log every 10 epochs. If unspecified, it will default to 10.<br>
     * @param options.validationSplit TO BE IMPLEMENTED. Float between 0 and 1. Fraction of the training data to be used as validation data. The model will set apart this fraction of the training data, will not train on it, and will evaluate the loss and any model metrics on this data at the end of each epoch. The validation data is selected from the last samples in the x and y data provided, before shuffling. Default: 0 == no validation.<br>
     * @param options.shuffle Boolean (whether to shuffle the training data before each epoch). If unspecified, it will default to true.<br>
     * @returns Promise, resolving to true once the model is trained.
     */
    async fit(options:{
        input: any[],
        target: any[],

        batchSize?: number,
        epochs?: number,
        log?: number,
        validationSplit?: number,
        shuffle?: boolean // TODO: use this -- now always Shuffles
    }){
        this.log('Start fit');
        // Sanity check
        if(!options.input.length || !options.target.length) throw('Missing input/target Arrays.');
        // let inputDims       = DeeplearnConverter.getDims(options.input[0]);
        // let modelInputDims  = this.model[0].units as number[];
        // let targetDims      = DeeplearnConverter.getDims(options.target[0]);
        // let modelTargetDims = this.model[this.model.length-1].units as number[];
        // if(!DeeplearnConverter.isEqual(inputDims, modelInputDims)) throw(`Wrong dimensions for inputs: model has shape [${modelInputDims}], but input has shape [${inputDims}].`);
        // if(!DeeplearnConverter.isEqual(targetDims, modelTargetDims)) throw(`Wrong dimensions for targets: model has shape [${modelTargetDims}], but target has shape [${targetDims}].`);
        
        // Defaults
        options.batchSize = options.batchSize || 32;
        options.epochs = options.epochs || 1;
        if (typeof(options.log) == 'undefined') options.log = 10;
        options.validationSplit = options.validationSplit || 0.0;
        if (typeof(options.shuffle) == 'undefined') options.shuffle = true;

        const timeStart: number = new Date().valueOf();

        const inputArray = options.input.map(el => DeeplearnConverter.convertToDeeplearnArray(this.deeplearn.inputTensor.shape, el));
        const targetArray = options.target.map(el => Array1D.new(el));

        const shuffledInputProviderBuilder =
            (typeof window === 'undefined') ?
                new InCPUMemoryShuffledInputProviderBuilder([inputArray, targetArray]) :
                new InGPUMemoryShuffledInputProviderBuilder([inputArray, targetArray]);

        const [inputProvider, targetProvider] =
            shuffledInputProviderBuilder.getInputProviders();
        const feedEntries = [
            {tensor: this.deeplearn.inputTensor, data: inputProvider},
            {tensor: this.deeplearn.targetTensor, data: targetProvider}
        ];

        await this.deeplearn.math.scope(async () => {
            for (let i = 0; i < options.epochs; i++) {
                this.stats.epochsRun = i; // TODO: enable pause & continue
                this.stats.cost = this.deeplearn.session.train(
                    this.deeplearn.costTensor, feedEntries, 4, this.deeplearn.optimizer, CostReduction.MEAN); //TODO: costreduction must be configurable?
                if((options.log > 0 && i % options.log) === 0){
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

    /**
     * Generates output predictions for the input samples.
     * @param options.input The input data; an Array of inputs.
     * @param options.batchSize TO BE IMPLEMENTED.
     * @param options.verbose TO BE IMPLEMENTED.
     */
    async predict(options:{
        input: any[],
        batchSize?: number,
        verbose?: number
    }):Promise<Float32Array | Int32Array | Uint8Array>{
        options.batchSize = options.batchSize || 32;
        options.verbose = options.verbose || 1;
        const inputArray = DeeplearnConverter.convertToDeeplearnArray(this.deeplearn.inputTensor.shape, options.input);
        const val = this.deeplearn.session.eval(this.deeplearn.predictionTensor, 
            [{tensor: this.deeplearn.inputTensor, data: inputArray}]);

        return val.data();
    }

    /**
     * 
     * @param msg Utility to log (for debugging).
     */
    private log(...msg:string[]): void{
        console.log(msg);
    }

}