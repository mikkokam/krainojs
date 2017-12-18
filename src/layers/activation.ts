import { Layer } from './layer';

interface Options{
    alpha: number; // LeakyReLU
}

export class Activation implements Layer{

    // see also Sequential class conversion fn
    public static types = ['Linear','Softmax','ReLU','LeakyReLU','ELU','Tanh','Sigmoid'];

    public type: string = 'Linear';
    public units;
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