import { Output } from './';

describe("Output", function () {
    var output: Output;

    // Can be constructed by a number or an Array
    it("should have size defined by plain number", function () {
        output = new Output(2);
        let units: number[] = output.units as number[];
        expect(units[0]).toBe(2);
    });
    it("should have size defined by an Array", function () {
        output = new Output([3,5]);
        let units: number[] = output.units as number[];
        expect(units.length).toBe(2);
        expect(units[0]).toBe(3);
        expect(units[1]).toBe(5);
    });

});