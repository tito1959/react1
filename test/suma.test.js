const suma = require("./suma");

describe.skip('sum', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(suma(1, 2)).toBe(3);
    });

    test('one of values is empty', () => {
        expect(suma(2)).toBe(NaN);
    });
})