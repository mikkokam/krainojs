export interface Optimizer{
    type: string;
    options?: any;
}


export class Optimizers{

    public static types = ['sgd','adagrad','adadelta','adam','adamax','momentum'];

    static adadelta(options?: {learningRate?: number, gamma?: number}):Optimizer{
        let optimizer:Optimizer = {type: 'adadelta', options:{learningRate: 0.1, gamma: 0.1}};
        // Merge with defaults
        optimizer.options = {...optimizer.options, ...options};
        return optimizer;
    }
    static adagrad(options?: {learningRate?: number}):Optimizer{
        let optimizer:Optimizer = {type: 'adagrad', options:{learningRate: 0.1}};
        optimizer.options = {...optimizer.options, ...options};
        return optimizer;
    }
    static adam(options?: {learningRate?: number, beta1?: number, beta2?: number}):Optimizer{
        let optimizer:Optimizer = {type: 'adam', options:{learningRate: 0.1, beta1: 0.9, beta2: 0.999}};
        optimizer.options = {...optimizer.options, ...options};
        return optimizer;
    }
    static adamax(options?: {learningRate?: number, beta1?: number, beta2?: number}):Optimizer{
        let optimizer:Optimizer = {type: 'adamax', options:{learningRate: 0.1, beta1: 0.9, beta2: 0.999}};
        optimizer.options = {...optimizer.options, ...options};
        return optimizer;
    }
    static momentum(options?: {learningRate?: number, momentum?: number}):Optimizer{
        let optimizer:Optimizer = {type: 'momentum', options:{learningRate: 0.1, momentum: 0.1}};
        optimizer.options = {...optimizer.options, ...options};
        return optimizer;
    }
    static sgd(options?: {learningRate: number}):Optimizer{
        let optimizer:Optimizer = {type: 'sgd', options:{learningRate: 0.1, momentum: 0.1}};
        optimizer.options = {...optimizer.options, ...options};
        return optimizer;
    }
    
}