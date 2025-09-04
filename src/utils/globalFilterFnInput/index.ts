import { Row } from '@tanstack/react-table';

export function globalFilterFnInput<T>(
  row: Row<T>,
  columnId: string,
  filter: string,
) {
  try {
    if (!filter) return true;
    const value = row.getValue<string>(columnId);
    return value.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1;
  } catch (error) {
    console.log(`Error on globalFilterFnInput`, error);
    return false;
  }
}
