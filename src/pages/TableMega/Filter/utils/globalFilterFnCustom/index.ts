import { Row } from '@tanstack/react-table';
import { TFilterActive } from '~/types';
import { filterByType } from '../filterByType';

export function globalFilterFnCustom<T>(
  rows: Row<T>,
  columnId: string,
  filters: TFilterActive[],
) {
  const valueCell: string = rows.getValue(columnId);
  console.log({ valueCell, filters });
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
