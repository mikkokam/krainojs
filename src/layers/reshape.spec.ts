import { Reshape } from './';

describe("Reshape", function () {
    var reshape: Reshape;

    it("should have size defined", function () {
        reshape = new Reshape([3,2,4]);
        expect(
            reshape.units[0] == 3 &&
            reshape.units[1] == 2 &&
            reshape.units[2] == 4
        ).toBeTruthy();
    });
});