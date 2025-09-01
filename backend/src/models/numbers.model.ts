import { NumbersItem, Operators } from '../types';
import { getRandoms } from '../utils/getRandoms';
import { filterNumber } from '../utils/filterNumber';

class NumbersModel {
  protected items: NumbersItem[];
  protected selected: number[];
  protected readonly limit: number = 20;

  constructor() {
    this.items = getRandoms(1000000);
    this.selected = [];
  }

  getItems(page?: number, op?: Operators, value?: number) {
    const items = this._getFilteredItems(op, value);
    if (page) {
      const startIndex = this._getStartIndex(page || 1);
      const endIndex = startIndex + this.limit;
      return items.slice(startIndex, endIndex);
    } else {
      return items;
    }
  }

  getTotal(op?: Operators, value?: number) {
    const items = this._getFilteredItems(op, value);
    return items.length;
  }

  getSelected() {
    return this.selected;
  }

  updateSelected(items: number[]) {
    this.selected = items;
  }

  updateItems(items: NumbersItem[]) {
    if (items.length) {
      const indexed: number[] = [];
      this.items.forEach((item, index) => {
        if (items.some((i) => i.id === item.id)) {
          indexed.push(index);
        }
      });
      indexed.forEach((index, i) => {
        if (items[i]) {
          this.items[index] = items[i];
        }
      });
    }
  }

  private _getStartIndex(page: number) {
    return (page - 1) * this.limit;
  }
  private _getFilteredItems(op?: Operators, value?: number) {
    return this.items.filter((item) => filterNumber(item, op || Operators.EQUAL, value || 0));
  }
}

const numbersModel = new NumbersModel();

export default numbersModel;
