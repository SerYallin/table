import React from 'react';
import { TInputUiProps } from './types';

export const InputUi: React.FC<TInputUiProps> = ({
  name,
  label,
  onChange,
  ...rest
}) => (
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    <input id={name} name={name} onChange={onChange} {...rest} />
  </div>
);
