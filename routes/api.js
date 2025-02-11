'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input;

    if (!input) {
      return res.json({ error: 'no input provided' });
    }

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // Check for both invalid number and unit
    if (!initNum && !initUnit) {
      return res.json({ error: 'invalid number and unit' });
    } 
    // Check for invalid unit
    else if (!initUnit) {
      return res.json({ error: 'invalid unit' });
    } 
    // Check for invalid number
    else if (initNum === null) {
      return res.json({ error: 'invalid number' });
    } 
    else {
      // Get the return unit and converted number
      let returnUnit = convertHandler.getReturnUnit(initUnit); // Get the corresponding return unit
      let returnNum = convertHandler.convert(initNum, initUnit); // Get the converted number

      // Check if returnUnit or returnNum are null (edge case handling)
      if (!returnUnit || returnNum === null) {
        return res.json({ error: 'invalid unit' });
      } else {
        return res.json({
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: `${initNum} ${convertHandler.spellOutUnit(initUnit)} converts to ${returnNum} ${convertHandler.spellOutUnit(returnUnit)}`
        });
      }
    }
  });
};
