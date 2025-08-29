import { observable, action, makeAutoObservable } from 'mobx';
import { NumbersItem, Operators, TOptions } from '@app/types';
import {
  getNumbers,
  getTotal,
  getSelectedNumbers,
  updateNumbers,
  updateSelected,
} from '@app/api/numbers-api';

export class TableStore {
  @observable items: NumbersItem[] = [];

  @observable selectedItems: number[] = [];

  filter: TOptions = {};

  total: number = 0;

  orderField: string = 'id';

  orderAsc: boolean = true;

  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.getItems();
    this.getSelectedItems();
    this.getTotal();
  }

  @action getItems = async () => {
    const value = parseInt(this.filter.value || '', 10) || 0;
    const op = (this.filter.op as Operators) || Operators.EQUAL;
    const page = parseInt(this.filter.page || '', 10) || 1;
    try {
      const items = await getNumbers(page, op, value);
      if (page > 1) {
        this.items = [...this.items, ...(items || [])];
      } else {
        this.items = items || [];
      }
    } catch (error) {
      console.error(error);
    }
  };

  @action getSelectedItems = async () => {
    try {
      const items = await getSelectedNumbers();
      this.selectedItems = items || [];
    } catch (error) {
      console.error(error);
    }
  };

  @action getTotal = async () => {
    const op = (this.filter.op as Operators) || Operators.EQUAL;
    const value = parseInt(this.filter.value || '', 10) || 0;
    try {
      this.total = (await getTotal(op, value)) || 0;
    } catch (error) {
      console.error(error);
    }
  };

  @action setFilter = async (filter: TOptions) => {
    this.filter = filter;
    const page = parseInt(this.filter.page || '', 10) || 1;
    await this.getItems();
    if (page === 1) {
      await this.getTotal();
    }
  };

  @action setSorting = async (field: string) => {
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

  @action getNextPage = async () => {
    try {
      const page = parseInt(this.filter.page || '', 10) || 1;
      await this.setFilter({ ...this.filter, page: (page + 1).toString() });
    } catch (error) {
      console.error(error);
    }
  };

  @action updateItems = async () => {
    try {
      await updateNumbers(this.items);
    } catch (error) {
      console.error(error);
    }
  };

  @action updateSelected = async (id: number) => {
    if (this.selectedItems.includes(id)) {
      this.selectedItems = this.selectedItems.filter((item) => item !== id);
    } else {
      this.selectedItems = [...this.selectedItems, id];
    }
    await updateSelected(this.selectedItems);
  };

  @action sort = async () => {
    this.items = this.items.sort((a, b) => {
      // @ts-ignore
      if (this.orderAsc) {
        // @ts-ignore
        return a[this.orderField] - b[this.orderField];
      }
      // @ts-ignore
      return b[this.orderField] - a[this.orderField];
    });
    await this.updateItems();
  };

  @action updateSortItems = async (items: NumbersItem[]) => {
    this.items = items;
    await this.updateItems();
  };
}

const tableStore = new TableStore();

export default tableStore;
