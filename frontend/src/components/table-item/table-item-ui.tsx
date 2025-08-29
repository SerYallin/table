import React from 'react';
import type { TableItemUiProps } from './types';
import styles from './table-item.module.scss';

export const TableItemUi: React.FC<TableItemUiProps> = ({
  item,
  index,
  onSelect,
  isSelected,
}) => (
  <li
    data-index={index}
    className={styles.item}
    onMouseUp={() => onSelect && onSelect(item.id as number)}
  >
    <span className={styles.check}>{isSelected && <>✓</>}</span>
    {Object.keys(item).map((key) => (
      <span key={key}>{item[key]}</span>
    ))}
  </li>
);
