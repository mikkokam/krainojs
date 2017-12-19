import { Layer } from './layer';

export interface Options {
    outputDepth: number,
    stride?: number,
    zeroPad?: number
};
export class Conv2D implements Layer{
    public units: number; // fieldSize
    public options: Options = {
        outputDepth: 1,
        stride: 1,
        zeroPad: 0
    };

    constructor(fieldSize:number, options?: Options){
        this.units = fieldSize;
        // Merge with defaults
        this.options = {...this.options, ...options};
    }
}