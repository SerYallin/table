import { NumbersItem } from '@app/types.ts';

export type TTableProps = {
  title?: string;
  onHeaderClick?: (name: string) => void;
  onSelect?: (id: number) => void;
  selectedItems: number[];
  updateItems: (Items: NumbersItem[]) => void;
  items?: NumbersItem[];
};

export type TTableUiProps = {
  title?: string;
  onHeaderClick?: (name: string) => void;
  onSelect?: (id: number) => void;
  selectedItems: number[];
  items?: NumbersItem[];
};
