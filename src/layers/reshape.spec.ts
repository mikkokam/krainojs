import { Layer, Layers } from './';

describe("Reshape", function () {
    var reshape: Layer;

    it("should have size defined", function () {
        reshape = Layers.reshape([3,2,4]);
        expect(
            (reshape.units as number[])[0] == 3 &&
            (reshape.units as number[])[1] == 2 &&
            (reshape.units as number[])[2] == 4
        ).toBeTruthy();
    });
});