import type { Table } from '@tanstack/react-table';
export function verifyIndeterminate<T>(table: Table<T>) {
  if (table.getIsAllRowsSelected()) {
    return true;
  }

  if (table.getIsSomeRowsSelected()) {
    return 'indeterminate';
  }

  return false;
}
