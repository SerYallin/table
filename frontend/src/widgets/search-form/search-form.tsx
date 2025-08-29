import tableStore from '@services/stores/table-store';
import { TOptions } from '@app/types';
import { FC, memo } from 'react';
import { SearchFormUi } from './search-form-ui';

export const SearchForm: FC = memo(() => {
  const onSubmit = (values: TOptions) => {
    tableStore.setFilter(values);
  };
  return <SearchFormUi onSubmit={onSubmit} />;
});
