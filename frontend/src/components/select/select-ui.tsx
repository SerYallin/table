import React from 'react';
import { TSelectUiProps } from './types';
import { Field } from '@components/field';

export const SelectUi: React.FC<TSelectUiProps> = ({
  name,
  onChange,
  value,
  label,
  options,
  ...rest
}) => (
  <Field>
    {label && <label htmlFor={name}>{label}</label>}
    <select id={name} name={name} onChange={onChange} value={value} {...rest}>
      {Object.keys(options).map((key) => (
        <option key={key} value={key}>
          {options[key]}
        </option>
      ))}
    </select>
  </Field>
);
