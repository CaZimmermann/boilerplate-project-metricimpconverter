function ConvertHandler() {
  this.getNum = function(input) {
    let numberRegex = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)?/;
    let match = input.match(numberRegex);

    if (!/\d/.test(input)) {
      return 1;}
    if (!match) return null;

    // If there's a fraction (i.e., contains "/"), process it
  if (input.includes("/")) {
    let parts = input.split("/");
    // If there's more than two parts (like 3/7.2/4), return null (invalid)
    if (parts.length !== 2) return null;
    return parseFloat(parts[0]) / parseFloat(parts[1]);
  }

  // If it's a simple number (no fraction), return the parsed float
  return parseFloat(input);
};

  this.getUnit = function(input) {
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let unitMatch = input.match(/[a-zA-Z]+$/);

    if (!unitMatch) return null;
    let unit = unitMatch[0].toLowerCase();
    if (unit === "l") unit = "L"; 

    return units.includes(unit) ? unit : null;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      mi: 'km', km: 'mi',
      gal: 'L', L: 'gal',
      lbs: 'kg', kg: 'lbs'
    };
    return unitMap[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const unitFullNames = {
      mi: 'miles', km: 'kilometers',
      gal: 'gallons', L: 'liters',
      lbs: 'pounds', kg: 'kilograms'
    };
    return unitFullNames[unit] || null;
  };

  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541, L: 1 / 3.78541,
      lbs: 0.453592, kg: 1 / 0.453592,
      mi: 1.60934, km: 1 / 1.60934
    };
    
    let result = conversionRates[initUnit] ? initNum * conversionRates[initUnit] : null;
    if (result !== null) {
      result = Math.round(result * 100000) / 100000;
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
