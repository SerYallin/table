import React from 'react';
import { BlockTypes } from '@app/types.ts';
import { TButtonProps, TButtonUiProps } from './types';
import { ButtonUI } from './button-ui';

export const Button: React.FC<TButtonProps> = ({
  title,
  onClick,
  htmlType,
  type,
}) => {
  const buttonUiProps: TButtonUiProps = {
    title,
    onClick,
    htmlType: htmlType || 'button',
    type: type || BlockTypes.PRIMARY,
  };
  return <ButtonUI {...buttonUiProps} />;
};
