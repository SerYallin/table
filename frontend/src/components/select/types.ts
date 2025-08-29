import React, { SelectHTMLAttributes } from 'react';
import { TOptions } from '@app/types.ts';

export type TSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  options: TOptions;
  label?: string;
};

export type TSelectUiProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: TOptions;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
