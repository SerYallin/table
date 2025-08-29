export type ItemType = {
  [key: string]: string | number;
};
export interface TableItemUiProps {
  item: ItemType;
  index: number;
  onSelect?: (id: number) => void;
  isSelected: boolean;
}
