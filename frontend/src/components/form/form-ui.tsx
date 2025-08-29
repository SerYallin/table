import React from 'react';
import { IFormUiProps } from './types';

export const FormUi: React.FC<IFormUiProps> = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <fieldset>{children}</fieldset>
  </form>
);
