import React, { InputHTMLAttributes } from 'react';

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

export type TInputUiProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
