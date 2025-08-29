import { NumbersItem } from '@app/types.ts';
export interface TableItemUiProps {
  item: NumbersItem;
  index: number;
  onSelect?: (id: number) => void;
  isSelected: boolean;
}
