import { NumbersItem } from '../types';

export const getRandoms = (count: number): NumbersItem[] => {
  const numbers: NumbersItem[] = [];
  for (let i = 0; i < count; i++) {
    numbers.push({
      id: i,
      value: Math.floor(Math.random() ** 3 * 1000000) + 1,
    });
  }
  return numbers;
};
