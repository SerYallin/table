import { NumbersItem, Operators } from '../types';

export const filterNumber = (arr: NumbersItem, op: Operators, value: number): boolean => {
  if (!value) {
    return true;
  }
  switch (op) {
    case Operators.EQUAL:
      return arr.value === value;
    case Operators.NOT_EQUAL:
      return arr.value !== value;
    case Operators.LESS_THAN:
      return arr.value < value;
    case Operators.GREATER_THAN:
      return arr.value > value;
    default:
      return false;
  }
};
