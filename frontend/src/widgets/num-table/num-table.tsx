import { observer, inject } from 'mobx-react';
import { useEffect, useRef } from 'react';
import { NumbersItem } from '@app/types';
import { Table } from '@components/table';
import styles from './num-table.module.scss';

export const NumTable = inject('tableStore')(
  observer(({ tableStore }) => {
    const { items, selectedItems, total } = tableStore;
    const refTable = useRef<HTMLDivElement>(null);
    const isLoadingRef = useRef(false);
    const scrollHandler = async () => {
      if (
        refTable.current &&
        window.pageYOffset + window.innerHeight >= refTable.current.offsetTop &&
        !isLoadingRef.current
      ) {
        isLoadingRef.current = true;
        tableStore.getNextPage().finally(() => {
          setTimeout(() => {
            isLoadingRef.current = false;
          }, 200);
        });
      }
    };
    const headerClickHandler = async (name: string) => {
      await tableStore.setSorting(name);
    };
    const selectHandler = async (id: number) => {
      await tableStore.updateSelected(id);
    };
    const handleDrufItems = async (Items: NumbersItem[]) => {
      await tableStore.updateSortItems(Items);
    };
    useEffect(() => {
      window.addEventListener('scroll', scrollHandler);

      return () => window.removeEventListener('scroll', scrollHandler);
    }, []);
    return (
      <div className={styles.wrapper}>
        <Table
          items={items}
          onHeaderClick={headerClickHandler}
          onSelect={selectHandler}
          selectedItems={selectedItems}
          updateItems={handleDrufItems}
        />
        {total > items.length && <div ref={refTable} />}
      </div>
    );
  })
);
