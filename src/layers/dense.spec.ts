import { Dense } from './';
import { Activation } from './activation';

describe("Dense", function () {
    var dense: Dense;

    it("should have size defined", function () {
        dense = new Dense(2);
        expect(dense.units).toBe(2);
    });
    it("should have default options", function () {
        dense = new Dense(2);
        let activation: Activation = dense.options.activation as Activation;
        expect(activation).toEqual(jasmine.any(Activation));
        expect(activation.type).toEqual('linear');
    });
    it("should override options", function () {
        dense = new Dense(2,{activation: 'relu'});
        let activation: Activation = dense.options.activation as Activation;
        expect(activation).toEqual(jasmine.any(Activation));
        expect(activation.type).toEqual('relu');
    });
});