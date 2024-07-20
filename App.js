// App.js

import React, { useState } from 'react';
import './App.css';
import * as math from 'mathjs';
import NthRootCalculator from './NthRootCalculator';
import UnitConversion from './UnitConversion';

function App() {
  const [calculatorType, setCalculatorType] = useState('scientific');

  return (
    <div className="App">
      <div className="calc-body">
        <h1>Calculator</h1>
        {calculatorType === 'scientific' ? (
          <ScientificCalculator />
        ) : calculatorType === 'nthRoot' ? (
          <NthRootCalculator />
        ) : (
          <UnitConversion />
        )}
        <div className="toggle-buttons">
          <button onClick={() => setCalculatorType('scientific')}>Scientific</button>
          <button onClick={() => setCalculatorType('nthRoot')}>Nth Root</button>
          <button onClick={() => setCalculatorType('unitConversion')}>Unit Conversion</button>
          {/* Add more buttons for other calculator types as needed */}
        </div>
      </div>
    </div>
  );
}


const ScientificCalculator = () => {
  const [expression, setExpression] = useState('');
  const [screenVal, setScreenVal] = useState('');
  const [customVariables] = useState({});
  const [mode, setMode] = useState('rad');

  function handleChange(e) {
    setExpression(e.target.value);
  }

  function handleClick(input) {
    setExpression((prevExpression) => prevExpression + input);
  }

  function calculate() {
    const formatNumber = (number) => {
      if (Number.isInteger(number)) {
        return number.toString();
      } else {
        return number.toFixed(4);
      }
    };
    try {
      const allVariables = {
        ...customVariables,
        pi: Math.PI,
        e: Math.E,
        fact: math.factorial,
        sin: mode === 'rad' ? Math.sin : (x) => Math.sin((x * Math.PI) / 180),
        cos: mode === 'rad' ? Math.cos : (x) => Math.cos((x * Math.PI) / 180),
        tan: mode === 'rad' ? Math.tan : (x) => Math.tan((x * Math.PI) / 180),
        asin: mode === 'rad' ? Math.asin : (x) => (Math.asin(x) * 180) / Math.PI,
        acos: mode === 'rad' ? Math.acos : (x) => (Math.acos(x) * 180) / Math.PI,
        atan: mode === 'rad' ? Math.atan : (x) => (Math.atan(x) * 180) / Math.PI,
        log: Math.log10,
        ln: Math.log,
        exp: Math.exp,
        sinh: Math.sinh,
        cosh: Math.cosh,
        tanh: Math.tanh,
        mean: math.mean,
        std: math.std,
        variance: math.variance,
        bin: (x) => parseInt(x, 2),
        oct: (x) => parseInt(x, 8),
        hex: (x) => parseInt(x, 16),
        complex: math.complex,
        dot: math.dot, 
      };

      const result = math.evaluate(expression, allVariables);

      if (result && result.isComplex) {
        setScreenVal(`${formatNumber(result.re)} + ${formatNumber(result.im)}i`);
      } else if (typeof result === 'number' && !isNaN(result)) {
        setScreenVal(formatNumber(result));
      } else {
        setScreenVal('Error: Invalid expression');
      }
    } catch (error) {
      setScreenVal('Error: Invalid expression');
    }
  }

  function clearScreen() {
    setExpression('');
    setScreenVal('');
  }

  function backspace() {
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
  }

  function setToRadian() {
    setMode('rad');
  }

  function setToDegree() {
    setMode('deg');
  }

  function shouldDisplayMode() {
    return /(sin|cos|tan|asin|acos|atan)\(/.test(expression);
  }

  return (
    <>
      <div className="input-section"> 
        <input
          className="screen"
          type="text"
          value={expression}
          onChange={handleChange}
        />
        <div className="output">
          Output: {screenVal} {shouldDisplayMode() && mode === 'rad' ? 'rad' : ''}
          {shouldDisplayMode() && mode === 'deg' ? 'deg' : ''}
        </div>
      </div>
      <div className="button-section">
        <div className="numeric-pad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((input) => (
            <button key={input} onClick={() => handleClick(input)}>
              {input}
            </button>
          ))}
          <button onClick={() => handleClick('.')}>.</button>
          <button onClick={() => handleClick('bin(')}>BIN</button>
          <button onClick={() => handleClick('oct(')}>OCT</button>
          <button onClick={() => handleClick('hex(')}>HEX</button>
        </div>
        <div className="operators">
          {[
            '+',
            '-',
            '*',
            '/',
            '^',
            'sqrt',
            'cbrt',
            'sin',
            'cos',
            'tan',
            
            'asin',
            'acos',
            'atan',
            'log',
            'ln',
            'exp',
            'sinh',
            'cosh',
            'tanh',
            'e',
            'mean',
            'std',
            'variance',
            'complex',
            'dot',  
            '(',
            ')',
          ].map((input) => (
            <button key={input} onClick={() => handleClick(input)}>
              {input}
            </button>
          ))}

          <button onClick={() => handleClick('pi')}>Pi</button>
          <button onClick={() => handleClick('fact(')}>Factorial</button>
        </div>
        <div className="control-buttons">
          <button className="clear-button" onClick={clearScreen}>
            C
          </button>
          <button className="equals-button" onClick={calculate}>
            =
          </button>
          <button className="backspace-button" onClick={backspace}>
            del
          </button>
        </div>
        <button className="radian-button" onClick={setToRadian}>Set to Radian</button>
        <button className="degree-button" onClick={setToDegree}>Set to Degree</button>
      </div>
    </>
  );
};

export default App;
