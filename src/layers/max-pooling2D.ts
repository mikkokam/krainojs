import { Layer } from './layer';
import { Activation } from './activation';

interface Options {
    stride?: number,
    zeroPad?: number
};

export class MaxPooling2D implements Layer{
    public units: number; // fieldSize
    public options: Options = {
        stride: 1,
        zeroPad: 0
    };

    constructor(fieldSize:number, options?: Options){
        this.units = fieldSize;
        // Merge with defaults
        this.options = {...this.options, ...options};
    }
}