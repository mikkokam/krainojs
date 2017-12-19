import { Layer } from './layer';

export interface Options{
    alpha: number; // LeakyReLU
}

// TODO: move static types to enums everywhere
export enum LayerType {
    Linear, Softmax, ReLU, LeakyReLU, ELU, Tanh, Sigmoid
};

export class Activation implements Layer{

    // see also Sequential class conversion fn
    public static types = ['Linear','Softmax','ReLU','LeakyReLU','ELU','Tanh','Sigmoid'];

    public type: string = 'Linear';
    public units: number;
    public options: Options = {
        alpha: 0.3
    };

    constructor(type: string, options?: Options){
        if(!!type && Activation.types.map(o => o.toUpperCase()).indexOf(type.toUpperCase()) === -1) throw(`Unknown type '${type}'`);
        if(!!type) this.type = type;

        // Merge with defaults
        this.options = {...this.options, ...options};
    }

}