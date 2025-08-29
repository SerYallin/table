import { FC } from 'react';
import styles from './field.module.scss';
import { FieldProps } from './types';

export const Field: FC<FieldProps> = ({ children }) => {
  return <div className={styles.field}>{children}</div>;
};
