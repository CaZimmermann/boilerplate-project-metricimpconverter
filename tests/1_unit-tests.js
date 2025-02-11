const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('convertHandler should correctly read a whole number input', function () {
        assert.equal(convertHandler.getNum('10L'), 10); 
      });
    test('convertHandler should correctly read a decimal number input', function () {
        assert.equal(convertHandler.getNum('10.5L'),  10.5);
    });
    test('convertHandler should correctly read a fractional input', function () {
        assert.equal(convertHandler.getNum('1/2L'),  0.5);
    });
    test('convertHandler should correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum('2.5/5L'),  0.5);
    });
    test('convertHandler should correctly read each valid input unit', function () {
        let units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        units.forEach(unit => {
            assert.equal(convertHandler.getUnit(unit), unit);
        });
    });
    test('convertHandler should correctly return an error for an invalid input unit', function () {
        assert.equal(convertHandler.getUnit('5blub'), null);
    });
    test('convertHandler should return the correct return unit for each valid input unit', function () {
        let expectedReturnUnits = {
            'gal': 'L',
            'L': 'gal',
            'mi': 'km',
            'km': 'mi',
            'lbs': 'kg',
            'kg': 'lbs'
        };
        for (let unit in expectedReturnUnits) {
            assert.equal(convertHandler.getReturnUnit(unit), expectedReturnUnits[unit]);
        }
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });
    test('convertHandler should correctly convert gal to L', function () {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    });
    test('convertHandler should correctly convert L to gal', function () {
        assert.equal(convertHandler.convert(1, 'L'), 0.26417);
    });
    test('convertHandler should correctly convert mi to km', function () {
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    });
    test('convertHandler should correctly convert km to mi', function () {
        assert.equal(convertHandler.convert(1, 'km'), 0.62137);
    });
    test('convertHandler should correctly convert lbs to kg', function () {
        assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    });
    test('convertHandler should correctly convert kg to lbs', function () {
        assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    });
});