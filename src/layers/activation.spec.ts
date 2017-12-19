import { Activation } from './activation';

describe("Activation", function () {
    var activation: Activation;

    it("should have type defined", function () {
        activation = new Activation('ReLU');
        expect(activation.type).toEqual('ReLU');
    });
    it("should have default options for LeakyReLU", function () {
        activation = new Activation('LeakyReLU');
        expect(activation.type).toEqual('LeakyReLU');
        expect(activation.options.alpha).toEqual(0.3);
    });
    it("should override options ", function () {
        activation = new Activation('LeakyReLU', {alpha: 0.1});
        expect(activation.type).toEqual('LeakyReLU');
        expect(activation.options.alpha).toEqual(0.1);
    });
});