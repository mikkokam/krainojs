import { Layer, Layers } from './layers';

describe("Activation", function () {
    let layer: Layer;

    it("should not accept unknown Activation types", function () {
        let type = 'nosuchlayer';
        expect( function(){ Layers.activation(type); } ).toThrow();
    });

    it("should have type defined", function () {
        layer = Layers.activation('ReLU');
        expect(layer.activation).toEqual('ReLU');
    });
    it("should have default options for LeakyReLU", function () {
        layer = Layers.activation('LeakyReLU');
        expect(layer.activation).toEqual('LeakyReLU');
        expect(layer.options.alpha).toEqual(0.3);
    });
    it("should override options for LeakyReLU", function () {
        layer = Layers.activation('LeakyReLU', {alpha: 0.1});
        expect(layer.activation).toEqual('LeakyReLU');
        expect(layer.options.alpha).toEqual(0.1);
    });
});