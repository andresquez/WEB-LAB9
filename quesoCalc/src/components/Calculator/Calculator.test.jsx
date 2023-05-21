/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* @jest-environment jsdom */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('App', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('Calculator grid render', () => {
    render(<Calculator />);
    const TodoElement = screen.getByTestId('render-cGrid');
    expect(TodoElement).toBeInTheDocument();
  });

  it('Test addition', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const firstNum = app.getByTestId('test-btn-2');
    const secondNum = app.getByTestId('test-btn-4');
    const opperation = app.getByTestId('test-btn-add');
    const equal = app.getByTestId('test-btn-equal');
    fireEvent.click(firstNum);
    fireEvent.click(opperation);
    fireEvent.click(secondNum);
    fireEvent.click(equal);
    expect(value.innerHTML).toBe('6');
  });

  it('Test substraction', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const firstNum = app.getByTestId('test-btn-9');
    const secondNum = app.getByTestId('test-btn-2');
    const opperation = app.getByTestId('test-btn-sub');
    const equal = app.getByTestId('test-btn-equal');
    fireEvent.click(firstNum);
    fireEvent.click(opperation);
    fireEvent.click(secondNum);
    fireEvent.click(equal);
    expect(value.innerHTML).toBe('7');
  });

  it('Test multiplication', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const firstNum = app.getByTestId('test-btn-5');
    const secondNum = app.getByTestId('test-btn-6');
    const opperation = app.getByTestId('test-btn-mul');
    const equal = app.getByTestId('test-btn-equal');
    fireEvent.click(firstNum);
    fireEvent.click(opperation);
    fireEvent.click(secondNum);
    fireEvent.click(equal);
    expect(value.innerHTML).toBe('30');
  });

  it('Test division', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const firstNum = app.getByTestId('test-btn-8');
    const secondNum = app.getByTestId('test-btn-2');
    const opperation = app.getByTestId('test-btn-div');
    const equal = app.getByTestId('test-btn-equal');
    fireEvent.click(firstNum);
    fireEvent.click(opperation);
    fireEvent.click(secondNum);
    fireEvent.click(equal);
    expect(value.innerHTML).toBe('4');
  });

  it('Test modulus', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const firstNum = app.getByTestId('test-btn-7');
    const secondNum = app.getByTestId('test-btn-7');
    const opperation = app.getByTestId('test-btn-modulus');
    const equal = app.getByTestId('test-btn-equal');
    fireEvent.click(firstNum);
    fireEvent.click(opperation);
    fireEvent.click(secondNum);
    fireEvent.click(equal);
    expect(value.innerHTML).toBe('0');
  });

  it('Test plus-minus', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const firstNum = app.getByTestId('test-btn-3');
    const opperation = app.getByTestId('test-btn-plusminus');
    fireEvent.click(firstNum);
    fireEvent.click(opperation);
    expect(value.innerHTML).toBe('-3');
  });

  it('Test 9 char limit by multiplication', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const firstNum = app.getByTestId('test-btn-9');
    const secondNum = app.getByTestId('test-btn-3');
    const zeroNum = app.getByTestId('test-btn-0');
    const opperation = app.getByTestId('test-btn-mul');
    const equal = app.getByTestId('test-btn-equal');

    for (let i = 1; i < 9; ++i) {
      fireEvent.click(firstNum);
    }

    fireEvent.click(opperation);
    fireEvent.click(secondNum);
    fireEvent.click(zeroNum);
    fireEvent.click(zeroNum);
    fireEvent.click(equal);
    expect(value.innerHTML).toBe('error'); // el resultado supera los 9 digitos
  });

  it('Test 9 char limit by tpying', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const firstNum = app.getByTestId('test-btn-5');

    for (let i = 0; i <= 10; ++i) {
      fireEvent.click(firstNum);
    }
    expect(value.innerHTML).toBe('555555555'); // no registra el decimo char
  });

  it('Test negative result', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const firstNum = app.getByTestId('test-btn-3');
    const secondNum = app.getByTestId('test-btn-4');
    const opperation = app.getByTestId('test-btn-sub');
    const equal = app.getByTestId('test-btn-equal');
    fireEvent.click(firstNum);
    fireEvent.click(opperation);
    fireEvent.click(secondNum);
    fireEvent.click(equal);
    expect(value.innerHTML).toBe('error');
  });

  it('Test fraction result', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const firstNum = app.getByTestId('test-btn-2');
    const secondNum = app.getByTestId('test-btn-7');
    const opperation = app.getByTestId('test-btn-div');
    const equal = app.getByTestId('test-btn-equal');
    fireEvent.click(firstNum);
    fireEvent.click(firstNum);
    fireEvent.click(opperation);
    fireEvent.click(secondNum);
    fireEvent.click(equal);
    expect(value.innerHTML).toBe('3.14');
  });

  it('Test dot/fraction operation', () => {
    const app = render(<Calculator />);
    const value = app.getByTestId('test-value');
    const zeroNum = app.getByTestId('test-btn-0');
    const firstNum = app.getByTestId('test-btn-5');
    const secondNum = app.getByTestId('test-btn-4');
    const opperation = app.getByTestId('test-btn-mul');
    const equal = app.getByTestId('test-btn-equal');
    const dot = app.getByTestId('test-btn-dot');
    fireEvent.click(zeroNum);
    fireEvent.click(dot);
    fireEvent.click(firstNum);
    fireEvent.click(opperation);
    fireEvent.click(secondNum);
    fireEvent.click(equal);
    expect(value.innerHTML).toBe('2'); // 0.5 times 4 = 2
  });
});
