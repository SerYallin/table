import { observer } from 'mobx-react';
import tableStore from '@services/stores/table-store';
import { Table } from '@components/table';
import { useEffect, useRef } from 'react';
import { NumbersItem } from '@app/types';

export const NumTable = observer(() => {
  const { items, selectedItems, total } = tableStore;
  const refTable = useRef<HTMLDivElement>(null);
  const scrollHandler = () => {
    if (
      refTable.current &&
      window.pageYOffset + window.innerHeight >= refTable.current.offsetTop
    ) {
      tableStore.getNextPage();
    }
  };
  const headerClickHandler = (name: string) => {
    tableStore.setSorting(name);
  };
  const selectHandler = (id: number) => {
    tableStore.updateSelected(id);
  };
  const handleDrufItems = (Items: NumbersItem[]) => {
    tableStore.updateSortItems(Items);
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);
  return (
    <>
      <Table
        items={items}
        onHeaderClick={headerClickHandler}
        onSelect={selectHandler}
        onDrugItems={handleDrufItems}
        selectedItems={selectedItems}
      />
      {total > items.length && <div ref={refTable} />}
    </>
  );
});
