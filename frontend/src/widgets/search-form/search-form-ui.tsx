import { Form } from '@components/form';
import { Button } from '@components/button';
import { Input } from '@components/input';
import { Select } from '@components/select';
import { Operators } from '@app/types';
import { FC } from 'react';
import { SearchFormProps } from './types';
import './search-form.scss';

export const SearchFormUi: FC<SearchFormProps> = ({ onSubmit }) => {
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
};
