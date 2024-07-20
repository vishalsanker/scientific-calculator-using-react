// UnitConversion.js

import React, { useState, useEffect } from 'react';

const UnitConversion = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState('');
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  const conversionFactors = {
    length: {
      meters: 1,
      centimeters: 100,
      inches: 39.3701,
      feet: 3.28084,
      yards: 1.09361,
      kilometers: 0.001,
      miles: 0.000621371,
    },
    area: {
      squareMeters: 1,
      squareCentimeters: 10000,
      squareInches: 1550.0031,
      squareFeet: 10.7639,
      squareYards: 1.19599,
      acres: 0.000247105,
      hectares: 0.0001,
    },
    volume: {
      cubicMeters: 1,
      cubicCentimeters: 1000000,
      cubicInches: 61023.7,
      cubicFeet: 35.3147,
      liters: 1000,
      milliliters: 1000000,
      gallons: 264.172,
      quarts: 1056.69,
      pints: 2113.38,
    },
    mass: {
      kilograms: 1,
      grams: 1000,
      milligrams: 1000000,
      ounces: 35.27396,
      pounds: 2.20462,
      tons: 0.001,
    },
    time: {
      seconds: 1,
      minutes: 0.0166667,
      hours: 0.000277778,
      days: 1.15741e-5,
      weeks: 1.65344e-6,
      months: 3.80517e-7,
      years: 3.171e-8,
    },
    temperature: {
      celsius: { to: 'celsius', conversion: (value) => value },
      fahrenheit: { to: 'celsius', conversion: (value) => (value - 32) * (5 / 9) },
      kelvin: { to: 'celsius', conversion: (value) => value - 273.15 },
    },
    speed: {
      metersPerSecond: 1,
      kilometersPerHour: 3.6,
      milesPerHour: 2.23694,
    },
    pressure: {
      pascals: 1,
      atmospheres: 9.86923e-6,
      millimetersOfMercury: 0.00750062,
      bars: 1e-5,
    },
    energy: {
      joules: 1,
      calories: 0.000239006,
      kilocalories: 2.39006e-7,
      electronVolts: 6.242e+18,
    },
    power: {
      watts: 1,
      kilowatts: 0.001,
      megawatts: 1e-6,
      horsepower: 0.00000134102,
    },
    force: {
      newtons: 1,
      dynes: 100000,
      poundsForce: 0.224809,
    },
    angle: {
      degrees: 1,
      radians: 0.0174533,
      gradians: 1.11111,
    },
    electricity: {
      volts: 1,
      amperes: 0.001,
      ohms: 1,
      watts: 1,
    },
    // New conversion factors
    standard: {
      // Standard deviation
      std: 1,
      // Variance
      variance: 1,
      // Random number generation
      random: 1,
      // Floor and ceiling functions
      floor: 1,
      ceil: 1,
      // Modulo operation
      modulo: 1,
      // Absolute value
      absolute: 1,
    },
  };

  useEffect(() => {
    const availableCategories = Object.keys(conversionFactors);
    setCategories(availableCategories);
    if (availableCategories.length > 0) {
      setUnits(Object.keys(conversionFactors[availableCategories[0]]));
      setFromUnit(Object.keys(conversionFactors[availableCategories[0]])[0]);
      setToUnit(Object.keys(conversionFactors[availableCategories[0]])[0]);
    }
  }, []);

  const handleCategoryChange = (category) => {
    setUnits(Object.keys(conversionFactors[category]));
    setFromUnit(Object.keys(conversionFactors[category])[0]);
    setToUnit(Object.keys(conversionFactors[category])[0]);
  };

  const handleConvert = () => {
    const category = Object.keys(conversionFactors).find((key) =>
      Object.keys(conversionFactors[key]).includes(fromUnit)
    );
    const toCategory = Object.keys(conversionFactors).find((key) =>
      Object.keys(conversionFactors[key]).includes(toUnit)
    );

    if (category && category === toCategory) {
      const fromConversion = conversionFactors[category][fromUnit];
      const toConversion = conversionFactors[category][toUnit];
      const convertedValue = (parseFloat(value) * toConversion) / fromConversion;

      setResult(`${value} ${fromUnit} is equal to ${convertedValue.toFixed(2)} ${toUnit}`);
    } else {
      setResult('Invalid conversion. Units belong to different categories.');
    }
  };

  return (
    <div>
      <h1>Unit Conversion</h1>
      <div>
        <label>
          Value:
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Category:
          <select value={fromUnit} onChange={(e) => handleCategoryChange(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          From:
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>
        <label>
          To:
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleConvert}>Convert</button>
      <div>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
};

export default UnitConversion;
