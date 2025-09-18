import { ColumnDef } from '@tanstack/react-table';

type Props<T> = {
  columns: ColumnDef<T>[];
};

export function countColSpan<T>({ columns }: Props<T>) {
  return Object.keys(columns).length;
}
