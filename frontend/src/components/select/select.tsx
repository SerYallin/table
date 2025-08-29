import React, { useContext } from 'react';
import { FormContext } from '@components/form/form-context';
import { TSelectProps, TSelectUiProps } from './types';
import { SelectUi } from './select-ui';

export const Select: React.FC<TSelectProps> = ({
  name,
  options,
  label,
  ...rest
}) => {
  const { values, setValues } = useContext(FormContext);
  const selectUiProps: TSelectUiProps = {
    name,
    label,
    options,
    value: values[name] || Object.keys(options)[0],
    onChange: (e) => {
      setValues({ ...values, [name]: (e.target as HTMLSelectElement).value });
    },
    ...rest,
  };
  return <SelectUi {...selectUiProps} />;
};
