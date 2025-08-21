import { Row } from '@tanstack/react-table';
import { filterByType } from '..';
import { TFilterActive } from '../../types';

export function globalFilterFnCustom<T>(
  rows: Row<T>,
  columnId: string,
  filters: TFilterActive[],
) {
  const valueCell: string = rows.getValue(columnId);
  console.log({ valueCell });
  const results: boolean[] = [];

  for (const filter of filters) {
    if (filter.column === columnId) {
      results.push(filterByType(filter.type, filter.value, valueCell));
    }
  }
  const result = results.find(item => item === true);
  if (result) {
    return true;
  }
  return false;
}
