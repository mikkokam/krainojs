import { Layer, Layers } from './';

describe("Output", function () {
    var output: Layer;

    // Can be constructed by a number or an Array
    it("should have size defined by plain number", function () {
        output = Layers.output(2);
        let units: number[] = output.units as number[];
        expect(units[0]).toBe(2);
    });
    it("should have size defined by an Array", function () {
        output = Layers.output([3,5]);
        let units: number[] = output.units as number[];
        expect(units.length).toBe(2);
        expect(units[0]).toBe(3);
        expect(units[1]).toBe(5);
    });

});