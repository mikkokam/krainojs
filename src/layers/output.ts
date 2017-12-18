import { Layer } from './layer';


export class Output implements Layer{

    constructor(
        public units: number | number[]
    ){
        if(!Array.isArray(this.units)) this.units = [this.units];
    }
}