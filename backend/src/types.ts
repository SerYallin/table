export type NumbersItem = {
  id: number;
  value: number;
};

export enum Operators {
  EQUAL = 'eq',
  NOT_EQUAL = 'ne',
  GREATER_THAN = 'gt',
  LESS_THAN = 'lt',
}
