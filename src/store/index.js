import { configureStore } from '@reduxjs/toolkit';
import {
  calculatorReducer,
  addDigit,
  togglePositive,
  toggleDecimalUsed,
  setOperator,
  evaluate,
  clear,
  togglePercent,
} from './slices/calculatorSlice';

const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
  },
});

export {
  store,
  addDigit,
  togglePositive,
  toggleDecimalUsed,
  setOperator,
  evaluate,
  clear,
  togglePercent,
};
