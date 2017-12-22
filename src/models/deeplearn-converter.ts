import { Loss } from "../losses/index";
import { Optimizer } from "../optimizers";
import { Layer } from "../layers";


import { Session } from "deeplearn/dist/graph/session";
import { Graph, Tensor } from "deeplearn/dist/graph/graph";
import { NDArrayMath } from "deeplearn/dist/math/math";
import { NDArray, Array1D, Array2D, Array3D, Array4D } from "deeplearn/dist/math/ndarray";
import { SGDOptimizer } from "deeplearn/dist/graph/optimizers/sgd_optimizer";
import { AdamOptimizer } from "deeplearn/dist/graph/optimizers/adam_optimizer";
import { AdamaxOptimizer } from "deeplearn/dist/graph/optimizers/adamax_optimizer";
import { AdadeltaOptimizer } from "deeplearn/dist/graph/optimizers/adadelta_optimizer";
import { AdagradOptimizer } from "deeplearn/dist/graph/optimizers/adagrad_optimizer";
import { MomentumOptimizer } from "deeplearn/dist/graph/optimizers/momentum_optimizer";

/**
 * The Interface including all data needed for a Deeplearn.js model
 */
export interface DeeplearnModel{
    graph?: Graph,
    inputTensor?: Tensor,
    targetTensor?: Tensor,
    predictionTensor?: Tensor,
    finalTensor?: Tensor,
    costTensor?: Tensor,
    session?: Session,
    math?: NDArrayMath,
    optimizer?: any
}

export class DeeplearnConverter{

    /**
     * Convert a javascript Array to a Deeplearn.js Array
     * @param deeplearn The Deeplearn.js model
     * @param arr The javascript Array
     * @returns The NDArray (Array1D, Array2D, Array3D, or Array4D)
     */
    static convertToDeeplearnArray(shape: any, arr: number[] | boolean[] | Float32Array | Int32Array | Uint8Array): NDArray{
        let dlArray;
        switch(shape.length){
            case 1:
            dlArray = Array1D.new(arr);
            break;
            case 2:
            dlArray = Array2D.new(shape, arr);
            break;
            case 3:
            dlArray = Array3D.new(shape, arr);
            break;
            case 4:
            dlArray = Array4D.new(shape, arr);
            break;
            default:
            throw(`Unknown dimensionality for array: ${arr}`)
        }
        return dlArray;
    }

    /**
     * Create a Deeplearn.js Cost function from our own Optimizer
     * @param deeplearn The Deeplearn.js model
     * @param loss The Loss in our model
     * @returns The tensor representing the mean-squared cost operation.
     */
    static createCostFunction(deeplearn: DeeplearnModel, loss: Loss){
        switch(loss.type.toUpperCase()){
            case 'MEANSQUARED':
            return deeplearn.graph.meanSquaredCost(deeplearn.targetTensor, deeplearn.predictionTensor);
            case 'SOFTMAXCROSSENTROPY':
            return deeplearn.graph.softmaxCrossEntropyCost(deeplearn.predictionTensor, deeplearn.targetTensor);
            default:
            throw ('Unknown Cost function: '+loss.type);
        }
    }

    /**
     * Create a Deeplearn.js Optimizer from our own Optimizer
     * @param optimizer The Optimizer from our model
     * @returns The Deeplearn.js Optimizer matching ours
     */
    static createOptimizer(optimizer: Optimizer){
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


    /**
     * Convert an Activation Layer to an Deeplearn.js Activation Tensor
     * @param deeplearn The Deeplearn model to use
     * @param x The input Tensor to the Activation
     * @param activation The Activation layer to convert from
     * @returns The Deeplearn.js Tensor representing the Activation.
     */
        static convertToDeeplearnActivation(deeplearn: DeeplearnModel, x: Tensor, activationLayer: Layer):Tensor{
        switch((activationLayer.activation as string).toUpperCase()){
            case 'SOFTMAX':
            return (deeplearn.graph.softmax(x));
            case 'ELU':
            return (deeplearn.graph.elu(x));
            case 'RELU':
            return (deeplearn.graph.relu(x));
            case 'TANH':
            return (deeplearn.graph.tanh(x));
            case 'SIGMOID':
            return (deeplearn.graph.sigmoid(x));
            
            case 'LEAKYRELU':
            return deeplearn.graph.leakyRelu(x, activationLayer.options.alpha);

            case 'LINEAR':
            // OMIT (linear does nothing)
            return (null);

            // Unsupported - could not find in deeplearn.js
            case 'SOFTPLUS':
            case 'SOFTSIGN':
            case 'SELU':
            throw ('Unsupported Activation type: '+activationLayer.activation);
            default:
            throw ('Unknown Activation type: '+activationLayer.activation);
        }
    }

    /**
     * Convert a Conv2D Layer to a Deeplearn.js Tensor to compute a 2D convolution.
     * @param deeplearn The Deeplearn model to use
     * @param prevLayer Tensor representing the previous layer in the model
     * @param fieldSize The size of the convolutional kernel
     * @param stride The stride of the convolution operation
     * @param zeroPad The amount of zero padding on all sides of the input tensor
     * @param outputDepth The output depth of the convolution operation
     * @param inputShape The dimensions of the input as an Array
     * @param index The layer index in the model
     * @returns The tensor representing the convolution operation
     */
    static convertToDeeplearnConv2D(
        deeplearn: DeeplearnModel,
        prevLayer: Tensor, 
        fieldSize:number, stride:number, zeroPad:number, outputDepth:number,
        inputShape: number[], index: number): Tensor {
        const wShape: [number, number, number, number] =
            [fieldSize, fieldSize, inputShape[2], outputDepth];
        let w: Array4D;
        let b: Array1D;

        w = Array4D.randTruncatedNormal(wShape, 0, 0.1);
        b = Array1D.zeros([outputDepth]);

        const wTensor = deeplearn.graph.variable(`conv2d-${index}-w`, w);
        const bTensor = deeplearn.graph.variable(`conv2d-${index}-b`, b);
        return deeplearn.graph.conv2d(
            prevLayer, wTensor, bTensor, fieldSize, outputDepth,
            stride, zeroPad);
    }

    /**
     * Helper to get the dimensions of a javascript Array
     * i.e. getDims([ [3,5], [2,8], [17,2] ]) == [3,2]
     * @param arr An Array, or an Array of Arrays, Array of Arrays of Arrays etc.
     * @returns Dimensions as an Array
     */
    static getDims(arr: any): number[]{
        return arr instanceof Array ? [arr.length].concat(this.getDims(arr[0])) : [];
    }
    /**
     * Helper to check if two Arrays match (deep comparison)
     * @param arr1 Array 1
     * @param arr2 Array 2
     * @returns True if Arrays match
     */
    static isEqual(arr1: any[], arr2: any[]): boolean{
        return (JSON.stringify(arr1) == JSON.stringify(arr2));
    }
  
}