import React from 'react';
import styles from './button.module.scss';
import { TButtonUiProps } from './types';

export const ButtonUI: React.FC<TButtonUiProps> = ({
  title,
  onClick,
  htmlType,
  type,
}) => (
  <button type={htmlType} onClick={onClick} className={styles[type]}>
    {title}
  </button>
);
