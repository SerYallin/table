import React from 'react';
import styles from './button.module.scss';
import { TButtonUiProps } from './types';
import { clsx } from 'clsx';

export const ButtonUI: React.FC<TButtonUiProps> = ({
  title,
  onClick,
  htmlType,
  type,
}) => (
  <button
    type={htmlType}
    onClick={onClick}
    className={clsx(styles.btn, styles[type])}
  >
    {title}
  </button>
);
