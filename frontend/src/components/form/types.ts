import React from 'react';
import { TOptions } from '@app/types.ts';

export interface IFormContext {
  values: TOptions;
  setValues: (values: TOptions) => void;
}

export interface IFormProps {
  onSubmit: (values: TOptions) => void;
  children: React.ReactNode;
}

export interface IFormUiProps {
  onSubmit: (event: React.SyntheticEvent) => void;
  children: React.ReactNode;
}
