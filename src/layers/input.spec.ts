import { Layer, Layers } from './layers';

describe("Input", function () {
    var input: Layer;

    // Can be constructed by a number or an Array
    it("should have size defined by plain number", function () {
        input = Layers.input(2);
        let units: number[] = input.units as number[];
        expect(units[0]).toBe(2);
    });
    it("should have size defined by an Array", function () {
        input = Layers.input([3,5]);
        let units: number[] = input.units as number[];
        expect(units.length).toBe(2);
        expect(units[0]).toBe(3);
        expect(units[1]).toBe(5);
    });

});