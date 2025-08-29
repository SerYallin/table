import React from 'react';
import type { TableItemUiProps } from './types';
import { TableItemUi } from './table-item-ui';

export const TableItem: React.FC<TableItemUiProps> = (props) => (
  <TableItemUi {...props} />
);
