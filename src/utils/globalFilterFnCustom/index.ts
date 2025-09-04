import { Row } from '@tanstack/react-table';
import { filterByType } from '..';
import { TFilterActive } from '../../types';

export function globalFilterFnCustom<T>(
  row: Row<T>,
  columnId: string,
  filters: TFilterActive[],
) {
  try {
    if (!filters.length) return true;
    const valueCell: string = row.getValue(columnId);
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
  } catch (error) {
    console.log(`Error on globalFilterFnCustom`, error);
    return false;
  }
}
