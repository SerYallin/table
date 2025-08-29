import React from 'react';
import { TOptions } from '@app/types.ts';
import { IFormProps, IFormUiProps } from './types';
import { FormContext } from './form-context';
import { FormUi } from './form-ui';

export const Form: React.FC<IFormProps> = (props) => {
  const [data, setData] = React.useState<TOptions>({} as TOptions);
  const { onSubmit, children } = props;

  const formUiProps: IFormUiProps = {
    onSubmit: (event: React.SyntheticEvent) => {
      event.preventDefault();
      onSubmit(data);
    },
    children,
  };

  const contextValue = React.useMemo(
    () => ({ values: data, setValues: setData }),
    [data, setData]
  );

  return (
    <FormContext.Provider value={contextValue}>
      <FormUi {...formUiProps} />
    </FormContext.Provider>
  );
};
