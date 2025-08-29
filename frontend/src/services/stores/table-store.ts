import { makeAutoObservable } from 'mobx';
import { NumbersItem, Operators, TOptions } from '@app/types';
import {
  getNumbers,
  getTotal,
  getSelectedNumbers,
  updateNumbers,
  updateSelected,
} from '@app/api/numbers-api';

export class TableStore {
  items: NumbersItem[] = [];

  selectedItems: number[] = [];

  filter: TOptions = {};

  total: number = 0;

  orderField: string = 'id';

  orderAsc: boolean = true;

  constructor() {
    makeAutoObservable(this, {
      orderField: false,
      orderAsc: false,
    });
    this.getItems();
    this.getSelectedItems();
    this.getTotal();
  }

  getItems = () => {
    const value = parseInt(this.filter.value || '', 10) || 0;
    const op = (this.filter.op as Operators) || Operators.EQUAL;
    const page = parseInt(this.filter.page || '', 10) || 1;
    getNumbers(page, op, value)
      .then((items) => {
        if (page > 1) {
          this.items = [...this.items, ...(items || [])];
        } else {
          this.items = items || [];
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getSelectedItems = async () => {
    try {
      const items = await getSelectedNumbers();
      this.selectedItems = items || [];
    } catch (error) {
      console.error(error);
    }
  };

  getTotal = async () => {
    const op = (this.filter.op as Operators) || Operators.EQUAL;
    const value = parseInt(this.filter.value || '', 10) || 0;
    try {
      this.total = (await getTotal(op, value)) || 0;
    } catch (error) {
      console.error(error);
    }
  };

  setFilter = async (filter: TOptions) => {
    this.filter = filter;
    const page = parseInt(this.filter.page || '', 10) || 1;
    await this.getItems();
    if (page === 1) {
      await this.getTotal();
    }
  };

  setSorting = async (field: string) => {
    let doSort = false;
    const fields = ['id', 'value'];
    if (fields.includes(field) && field !== this.orderField) {
      this.orderField = field;
      this.orderAsc = true;
      doSort = true;
    } else if (field === this.orderField) {
      this.orderAsc = !this.orderAsc;
      doSort = true;
    }
    if (doSort) {
      await this.sort();
    }
  };

  getNextPage = async () => {
    try {
      const page = parseInt(this.filter.page || '', 10) || 1;
      await this.setFilter({ ...this.filter, page: (page + 1).toString() });
    } catch (error) {
      console.error(error);
    }
  };

  updateItems = async () => {
    try {
      await updateNumbers(this.items);
    } catch (error) {
      console.error(error);
    }
  };

  updateSelected = async (id: number) => {
    if (this.selectedItems.includes(id)) {
      this.selectedItems = this.selectedItems.filter((item) => item !== id);
    } else {
      this.selectedItems = [...this.selectedItems, id];
    }
    await updateSelected(this.selectedItems);
  };

  sort = async () => {
    this.items = this.items.sort((a, b) => {
      if (this.orderAsc) {
        // @ts-ignore
        return a[this.orderField] - b[this.orderField];
      }
      // @ts-ignore
      return b[this.orderField] - a[this.orderField];
    });
    await this.updateItems();
  };

  updateSortItems = async (items: NumbersItem[]) => {
    this.items = items;
    await this.updateItems();
  };
}

const tableStore = new TableStore();

export default tableStore;
