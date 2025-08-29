import React from 'react';
import { TInputUiProps } from './types';
import { Field } from '@components/field';

export const InputUi: React.FC<TInputUiProps> = ({
  name,
  label,
  onChange,
  ...rest
}) => (
  <Field>
    {label && <label htmlFor={name}>{label}</label>}
    <input id={name} name={name} onChange={onChange} {...rest} />
  </Field>
);
