import { NumbersItem } from '@app/types.ts';
import { ItemType } from '../table-item/types';

export type TTableProps = {
  title?: string;
  onHeaderClick?: (name: string) => void;
  onSelect?: (id: number) => void;
  onDrugItems?: (items: NumbersItem[]) => void;
  selectedItems: number[];
  items?: ItemType[];
};

export type TTableUiProps = TTableProps & {};
