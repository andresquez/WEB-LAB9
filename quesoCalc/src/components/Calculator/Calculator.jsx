/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';
import './Calculator.scss';

export default function Calculator() {
  const [exprString, setExprString] = useState('');
  const [screenValue, setScreenValue] = useState('');
  const [isNegative, setNegativesFlag] = useState(false);

  function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }

  const validOperators = ['-', '+', '/', '*', '=', '%', '+/-'];

  const inputData = (calcInput) => {
    // Clear screen
    if (calcInput === 'C') {
      setScreenValue('');
      setExprString('');
      setNegativesFlag(false);
      return;
    }

    // Do nothing if max char (9) reached
    if (screenValue.length === 9) { return; }

    // Clear sceeen if max char (9) is exceeded
    if (screenValue.length >= 9) {
      setScreenValue('');
      setExprString('');
      setNegativesFlag(false);
      return;
    }

    // Do nothing if no numbers are inputted or only operator is inputted
    if (validOperators.includes(calcInput) && screenValue === '') {
      return;
    }
    if (validOperators.includes(calcInput) && validOperators.includes(screenValue.slice(-1))) {
      return;
    }

    // Plus minus operation
    if (calcInput === '+/-') {
      if (validOperators.includes(screenValue.charAt(0)) === true) {
        return;
      }
      setScreenValue(`-${screenValue}`);
      setExprString(`-${exprString}`);
      setNegativesFlag(true);
      return;
    }

    // Number input
    if (!validOperators.includes(calcInput)) {
      if (validOperators.includes(exprString.slice(-1))) {
        setScreenValue(calcInput);
        setExprString(exprString + calcInput);
      } else {
        setScreenValue(screenValue + calcInput);
        setExprString(exprString + calcInput);
      }
    }

    // All operations except EQUAL
    if (validOperators.includes(calcInput) && calcInput !== '=') {
      if (validOperators.includes(exprString.slice(-1))) {
        return;
      }

      setExprString(exprString + calcInput);
      setScreenValue(eval(exprString).toString());
      setExprString(eval(exprString).toString() + calcInput);

      // Show error if result is negative from a keyMinus
      if (eval(exprString).toString().charAt(0) === '-' && isNegative === false) {
        setScreenValue('error');
        setExprString('');
      }

      // Show error if max is exceeded
      if (eval(exprString).toString().length > 9) {
        setScreenValue('error');
        setExprString('');
      }
      return;
    }

    // EQUAL - Eval expression string
    if (calcInput === '=') {
      if (validOperators.includes(exprString.slice(-1))) {
        return;
      }
      setScreenValue(eval(exprString).toString());
      setExprString(eval(exprString).toString());

      // Show error if result is negative from a keyMinus
      if (eval(exprString).toString().charAt(0) === '-' && isNegative === false) {
        setScreenValue('error');
        setExprString('');

      // Show only 2 decimals if result is float and over 9 char max limit
      } else if (eval(exprString).toString().length > 9 && isFloat(eval(exprString))) {
        const tempResult = parseFloat(eval(exprString)).toFixed(2);
        if (tempResult.toString().length > 9) {
          setScreenValue('error');
          setExprString('');
        } else {
          setScreenValue(tempResult);
          setExprString(tempResult);
        }
      } else if (eval(exprString).toString().length > 9) { // show error if over 9 char max limit
        setScreenValue('error');
        setExprString('');
      }
    }
  };

  return (
    <div className="cBody">
      <div className="cScreen">
        <p className="cValue" data-testid="test-value">{screenValue}</p>
      </div>
      <div className="cGrid" data-testid="render-cGrid">
        <div className="key keyC" data-testid="test-clear" onClick={() => inputData('C')}><p>C</p></div>
        <div className="key keyModulus" data-testid="test-btn-modulus" onClick={() => inputData('%')}><p>%</p></div>
        <div className="key keyPlusMinus" data-testid="test-btn-plusminus" onClick={() => inputData('+/-')}><p>&#8314;&#8725;&#8331;</p></div>
        <div className="key keyDivide" data-testid="test-btn-div" onClick={() => inputData('/')}><p>÷</p></div>

        <div className="key key7" data-testid="test-btn-7" onClick={() => inputData('7')}><p>7</p></div>
        <div className="key key8" data-testid="test-btn-8" onClick={() => inputData('8')}><p>8</p></div>
        <div className="key key9" data-testid="test-btn-9" onClick={() => inputData('9')}><p>9</p></div>
        <div className="key keyMult" data-testid="test-btn-mul" onClick={() => inputData('*')}><p>&times;</p></div>

        <div className="key key4" data-testid="test-btn-4" onClick={() => inputData('4')}><p>4</p></div>
        <div className="key key5" data-testid="test-btn-5" onClick={() => inputData('5')}><p>5</p></div>
        <div className="key key6" data-testid="test-btn-6" onClick={() => inputData('6')}><p>6</p></div>
        <div className="key keyMinus" data-testid="test-btn-sub" onClick={() => inputData('-')}><p>-</p></div>

        <div className="key key1" data-testid="test-btn-1" onClick={() => inputData('1')}><p>1</p></div>
        <div className="key key2" data-testid="test-btn-2" onClick={() => inputData('2')}><p>2</p></div>
        <div className="key key3" data-testid="test-btn-3" onClick={() => inputData('3')}><p>3</p></div>
        <div className="key keyPlus" data-testid="test-btn-add" onClick={() => inputData('+')}><p>+</p></div>

        <div className="key key0" data-testid="test-btn-0" onClick={() => inputData('0')}><p>0</p></div>
        <div className="key keyDot" data-testid="test-btn-dot" onClick={() => inputData('.')}><p>.</p></div>
        <div className="key keyEqual" data-testid="test-btn-equal" onClick={() => inputData('=')}><p>=</p></div>
      </div>
    </div>
  );
}
