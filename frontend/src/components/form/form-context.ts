import { createContext } from 'react';
import { IFormContext } from './types';

export const FormContext = createContext<IFormContext>({
  values: {},
  setValues: () => {},
});
