import { FormContext } from '@components/form/form-context';
import React, { useContext } from 'react';
import { InputUi } from './input-ui';
import { TInputProps, TInputUiProps } from './types';

export const Input: React.FC<TInputProps> = ({ label, name, ...rest }) => {
  const { values, setValues } = useContext(FormContext);
  const inputUiProps: TInputUiProps = {
    label,
    name,
    value: values[name] || '',
    onChange: (e) => {
      setValues({ ...values, [name]: (e.target as HTMLInputElement).value });
    },
    ...rest,
  };
  return <InputUi {...inputUiProps} />;
};
