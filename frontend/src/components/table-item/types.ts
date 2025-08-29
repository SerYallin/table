import { NumbersItem } from '@app/types';

export interface TableItemUiProps {
  item: NumbersItem;
  index: number;
  onSelect?: (id: number) => void;
  isSelected: boolean;
}
