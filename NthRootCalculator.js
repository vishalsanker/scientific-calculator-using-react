import React, { useState } from "react";
import "./App.css";

function NthRootCalculator() {
  const [base, setBase] = useState("");
  const [n, setN] = useState("");
  const [result, setResult] = useState(null);

  function handleBaseChange(e) {
    setBase(e.target.value);
  }

  function handleNChange(e) {
    setN(e.target.value);
  }

  function calculateNthRoot() {
    const baseValue = parseFloat(base);
    const nValue = parseFloat(n);

    if (!isNaN(baseValue) && !isNaN(nValue) && nValue !== 0) {
      const resultValue = Math.pow(baseValue, 1 / nValue);
      setResult(resultValue);
    } else {
      setResult(null);
    }
  }

  return (
    <div className="nth-root-calculator">
      <label>
        Base:
        <input type="number" value={base} onChange={handleBaseChange} />
      </label>
      <br />
      <label>
        n (Root):
        <input type="number" value={n} onChange={handleNChange} />
      </label>
      <br />
      <button onClick={calculateNthRoot}>Calculate nth Root</button>
      <br />
      {result !== null && <div>Result: {result}</div>}
    </div>
  );
}

export default NthRootCalculator;