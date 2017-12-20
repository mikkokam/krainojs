import { Layer, Layers } from './layers';

describe("Dense", function () {
    var dense: Layer;

    it("should have size defined", function () {
        dense = Layers.dense(2);
        expect(dense.units).toBe(2);
    });
    it("should have default options", function () {
        dense = Layers.dense(2);
        let activationLayer: Layer = dense.options.activation as Layer;
        expect(activationLayer.activation).toEqual('linear');
    });
    it("should override options", function () {
        dense = Layers.dense(2,{activation: 'relu'});
        let activationLayer: Layer = dense.options.activation as Layer;
        expect(activationLayer.activation).toEqual('relu');
    });
    it("should not accept unknown Activation types", function () {
        let type = 'nosuchlayer';
        expect( function(){ Layers.dense(2,{activation: type}); } ).toThrow();
    });
});