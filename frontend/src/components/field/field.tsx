import { FC, memo } from 'react';
import styles from './field.module.scss';
import { FieldProps } from './types';

export const Field: FC<FieldProps> = memo(({ children }) => {
  return <div className={styles.field}>{children}</div>;
});
