import './style.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addDigit,
  togglePositive,
  toggleDecimalUsed,
  setOperator,
  evaluate,
  clear,
  togglePercent,
} from './store';

export default function App() {
  const dispatch = useDispatch();
  const { operator, displayValue } = useSelector((state) => state.calculator);

  const handleAddDigit = (digit) => {
    if (operator === null) {
      dispatch(addDigit(digit));
    } else {
      dispatch(addDigit(displayValue + digit));
    }
  };

  const handleTogglePositive = () => {
    dispatch(togglePositive());
  };

  const handleToggleDecimal = () => {
    if (!displayValue.includes('.')) {
      handleAddDigit('.');
      dispatch(toggleDecimalUsed());
    }
  };

  const handleOperator = (operator) => {
    dispatch(setOperator(operator));
  };

  const handleEvaluate = () => {
    if (operator !== null && displayValue !== '0') {
      dispatch(evaluate());
    }
  };

  const handleClear = () => {
    dispatch(clear());
  };

  const handleTogglePercent = () => {
    dispatch(togglePercent());
  };

  const handleNumberClick = (num) => {
    if (displayValue === '0') {
      handleAddDigit(num.toString());
    } else {
      handleAddDigit(num.toString());
    }
  };

  const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  function formatOperand(operand) {
    if (typeof operand !== 'string') return operand;
    if (operand == null) return;
    const [integer, decimal] = operand.split('.');
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
  }

  return (
    <div className="calculator App">
      <div className="display">{formatOperand(displayValue)}</div>
      <div className="row">
        <button className="button function" onClick={handleClear}>
          AC
        </button>
        <button className="button function" onClick={handleTogglePositive}>
          +/-
        </button>
        <button className="button function" onClick={handleTogglePercent}>
          %
        </button>
        <button
          className="button opertations"
          onClick={() => handleOperator('/')}
        >
          ÷
        </button>
      </div>
      <div className="row">
        <button className="button" onClick={() => handleNumberClick(7)}>
          7
        </button>
        <button className="button" onClick={() => handleNumberClick(8)}>
          8
        </button>
        <button className="button" onClick={() => handleNumberClick(9)}>
          9
        </button>
        <button
          className="button opertations"
          onClick={() => handleOperator('*')}
        >
          ×
        </button>
      </div>
      <div className="row">
        <button className="button" onClick={() => handleNumberClick(4)}>
          4
        </button>
        <button className="button" onClick={() => handleNumberClick(5)}>
          5
        </button>
        <button className="button" onClick={() => handleNumberClick(6)}>
          6
        </button>
        <button
          className="button opertations"
          onClick={() => handleOperator('-')}
        >
          -
        </button>
      </div>
      <div className="row">
        <button className="button" onClick={() => handleNumberClick(1)}>
          1
        </button>
        <button className="button" onClick={() => handleNumberClick(2)}>
          2
        </button>
        <button className="button" onClick={() => handleNumberClick(3)}>
          3
        </button>
        <button
          className="button opertations"
          onClick={() => handleOperator('+')}
        >
          +
        </button>
      </div>
      <div className="row">
        <button className="button flex-two">0</button>
        <button className="button" onClick={handleToggleDecimal}>
          .
        </button>
        <button className="button evaluate" onClick={handleEvaluate}>
          =
        </button>
      </div>
    </div>
  );
}
