import { createSlice } from '@reduxjs/toolkit';

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    displayValue: 0,
    decimalUsed: false,
    positive: true,
    operator: null,
    previousValue: null,
  },
  reducers: {
    addDigit: (state, action) => {
      const digit = action.payload;
      if (state.displayValue === '0') {
        state.displayValue = digit;
      } else {
        state.displayValue += digit;
      }
    },
    togglePositive: (state) => {
      state.positive = !state.positive;
      const value = parseFloat(state.displayValue);
      state.displayValue = state.positive
        ? Math.abs(value).toString()
        : '-' + Math.abs(value).toString();
    },
    toggleDecimalUsed: (state) => {
      state.decimalUsed = true;
    },
    togglePercent: (state) => {
      state.displayValue = (parseFloat(state.displayValue) / 100).toString();
    },
    setOperator: (state, action) => {
      state.operator = action.payload;
      state.previousValue = state.displayValue;
      state.displayValue = '0';
      state.decimalUsed = false;
    },
    evaluate: (state) => {
      const { operator, previousValue, displayValue } = state;
      let result = parseFloat(previousValue);
      const currentValue = parseFloat(displayValue);

      switch (operator) {
        case '+':
          result += currentValue;
          break;
        case '-':
          result -= currentValue;
          break;
        case '*':
          result *= currentValue;
          break;
        case '/':
          result /= currentValue;
          break;
        default:
          break;
      }
      state.displayValue = result.toString();
      state.operator = null;
      state.previousValue = null;
      state.decimalUsed = state.displayValue.includes('.');
    },
    clear(state) {
      state.displayValue = '0';
      state.decimalUsed = false;
      state.positive = true;
      state.operator = null;
      state.previousValue = null;
    },
  },
});

export const {
  addDigit,
  togglePositive,
  toggleDecimalUsed,
  setOperator,
  evaluate,
  clear,
  togglePercent,
} = calculatorSlice.actions;
export const calculatorReducer = calculatorSlice.reducer;
