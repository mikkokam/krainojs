import { Layer } from './layer';

export class Reshape implements Layer{
    public units: number[]; // output shape

    constructor(outputShape:number[]){
        this.units = outputShape;
    }
}