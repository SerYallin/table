import React from 'react';
import { clsx } from 'clsx';
import { TButtonUiProps } from './types';
import styles from './button.module.scss';

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
