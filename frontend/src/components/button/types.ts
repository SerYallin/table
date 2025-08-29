import { BlockTypes } from '@app/types.ts';
import { ButtonHTMLAttributes } from 'react';

export type TButtonUiProps = {
  title: string;
  onClick?: (e: React.SyntheticEvent) => void;
  htmlType: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  type: BlockTypes;
};

export type TButtonProps = Partial<Omit<TButtonUiProps, 'title'>> & {
  title: string;
};
