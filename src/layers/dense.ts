import { Layer } from './layer';
import { Activation } from './activation';

export interface Options {
    activation: Activation | string
};

export class Dense implements Layer{
    public units: number;
    public options: Options = {
        activation: 'linear'
    }

    constructor(
        units: number,
        options?: Options
    ){
        this.units = units;
        
        // Merge with defaults
        this.options = {...this.options, ...options};
        this.options.activation = (typeof(this.options.activation) == 'string') ? new Activation(this.options.activation) : this.options.activation;
    }
}