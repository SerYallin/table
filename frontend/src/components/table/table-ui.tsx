import React from 'react';
import { TableItem } from '@components/table-item';
import styles from './table.module.scss';
import type { TTableUiProps } from './types';

export const TableUi = React.forwardRef<HTMLUListElement, TTableUiProps>(
  ({ title, items, onHeaderClick, onSelect, selectedItems }, ref) => {
    const style: React.CSSProperties & {
      '--columns-count'?: number;
    } = {
      '--columns-count': items?.length ? Object.keys(items[0]).length : 0,
    };
    return (
      <div className={styles.container} style={style}>
        {title && <div className={styles.title} />}
        {items && items.length > 0 && (
          <>
            <div className={styles.header}>
              <span />
              {Object.keys(items[0]).map((key) => (
                <span
                  role="button"
                  tabIndex={0}
                  key={key}
                  onClick={() => onHeaderClick && onHeaderClick(key)}
                  onKeyDown={(e) => {
                    if (
                      (e.key === 'Enter' || e.key === ' ') &&
                      typeof onHeaderClick === 'function'
                    ) {
                      onHeaderClick(key);
                    }
                  }}
                  className={styles.item}
                >
                  {key}
                </span>
              ))}
            </div>
            <ul ref={ref} className={styles.items}>
              {items.map((item, index) => (
                <TableItem
                  key={item.id}
                  index={index}
                  onSelect={onSelect}
                  isSelected={selectedItems?.includes(item.id as number)}
                  item={item}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
);
