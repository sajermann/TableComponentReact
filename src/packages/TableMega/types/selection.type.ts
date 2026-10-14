import { OnChangeFn, Row, RowSelectionState } from '@tanstack/react-table';

export type TSelection<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  type: 'multi' | 'single';
  rowSelection: RowSelectionState;
  setRowSelection: OnChangeFn<RowSelectionState>;
  disableSelectionRow?: (data: Row<T>) => boolean;
  disableCheckbox?: boolean;
  singleRadio?: true;
};
