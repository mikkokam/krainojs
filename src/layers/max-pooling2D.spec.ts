import { Layer, Layers } from './';

describe("MaxPooling2D", function () {
    var maxPooling2D: Layer;

    it("should have size defined", function () {
        maxPooling2D = Layers.maxPooling2D(2);
        expect(maxPooling2D.units).toBe(2);
    });
    it("should have default options", function () {
        maxPooling2D = Layers.maxPooling2D(2);
        expect(
            maxPooling2D.options.stride === 1 &&
            maxPooling2D.options.zeroPad === 0
        ).toBeTruthy();
    });
    it("should override options", function () {
        maxPooling2D = Layers.maxPooling2D(2,{zeroPad: 2});
        expect(
            maxPooling2D.options.stride === 1 &&
            maxPooling2D.options.zeroPad === 2
        ).toBeTruthy();
    });
});