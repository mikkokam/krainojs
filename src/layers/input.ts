import { Layer } from './layer';


export class Input implements Layer{

    constructor(
        public units: number | number[]
    ){
        if(!Array.isArray(this.units)) this.units = [this.units];
    }
}