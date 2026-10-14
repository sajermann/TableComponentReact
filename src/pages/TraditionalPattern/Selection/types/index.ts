import type { RowSelectionState } from '@tanstack/react-table';

export type TConfig = {
  mode: 'single' | 'multi';
  componentType: 'checkbox' | 'radio' | 'switch' | 'favorite';
  disableByIdGreaterThan: number | null;
};

export type TOptions<T> = {
  value: T;
  label: string;
};

export type TSelectionRow = RowSelectionState;
