import { Form } from '@components/form';
import { Button } from '@components/button';
import { Input } from '@components/input';
import { Select } from '@components/select';
import tableStore from '@services/stores/table-store';
import { TOptions, Operators } from '@app/types';
import { FC, memo } from 'react';

export const SearchForm: FC = memo(() => {
  const onSubmit = (values: TOptions) => {
    tableStore.setFilter(values);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Select
        name="op"
        options={{
          [Operators.EQUAL]: '=',
          [Operators.NOT_EQUAL]: '!=',
          [Operators.LESS_THAN]: '<',
          [Operators.GREATER_THAN]: '>',
        }}
      />
      <Input type="number" name="value" />
      <Button title="Search" htmlType="submit" />
    </Form>
  );
});
