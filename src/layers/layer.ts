import { Activation } from "./";

export interface Layer{
    units: number | number[];
    type?: string;
    options?: any;
    activation?: Activation;
}