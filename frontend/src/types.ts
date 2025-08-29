export type NumbersItem = {
  id: number;
  value: number;
  order?: number;
};

export type TOptions = {
  [key: string]: string;
};

export enum Operators {
  EQUAL = 'eq',
  NOT_EQUAL = 'ne',
  GREATER_THAN = 'gt',
  LESS_THAN = 'lt',
}

export enum BlockTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  CUSTOM = 'custom',
}
