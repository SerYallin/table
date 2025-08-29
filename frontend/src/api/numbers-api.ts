import { NumbersItem, Operators } from '@app/types.ts';
const api_url = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:3001/api/';

export const getNumbers = async (
  page?: number,
  op?: Operators,
  value?: number
) => {
  let url = `${api_url}numbers/${page || 1}`;
  if (value) {
    url += op ? `/${op}/${value}` : `/${Operators.EQUAL}/${value}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      'Something went wrong when fetching the numbers. Please try again later.'
    );
  }
  return (await response.json()) as NumbersItem[];
};

export const getSelectedNumbers = async () => {
  const url = `${api_url}selected`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      'Something went wrong when fetching the numbers. Please try again later.'
    );
  }
  return (await response.json()) as number[];
};

export const getTotal = async (op?: Operators, value?: number) => {
  let url = `${api_url}total`;
  if (value) {
    url += op ? `/${op}/${value}` : `/${Operators.EQUAL}/${value}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      'Something went wrong when fetching the numbers. Please try again later.'
    );
  }

  return ((await response.json()).total as number) || 0;
};

export const updateNumbers = async (items: NumbersItem[]) => {
  const response = await fetch(`${api_url}numbers`, {
    method: 'PATCH',
    body: JSON.stringify(items),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(
      'Something went wrong when fetching the numbers. Please try again later.'
    );
  }
  return { status: 200, message: 'success' };
};
export const updateSelected = async (items: number[]) => {
  const response = await fetch(`${api_url}selected`, {
    method: 'PUT',
    body: JSON.stringify(items),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(
      'Something went wrong when fetching the numbers. Please try again later.'
    );
  }
  return { status: 200, message: 'success' };
};
