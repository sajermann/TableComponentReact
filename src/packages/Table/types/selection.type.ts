import { OnChangeFn, RowSelectionState } from '@tanstack/react-table';

export type TSelection = {
  type: 'multi' | 'single';
  rowSelection: RowSelectionState;
  setRowSelection: OnChangeFn<RowSelectionState>;
};
