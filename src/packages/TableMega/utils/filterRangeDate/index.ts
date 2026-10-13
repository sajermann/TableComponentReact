import { Row } from '@tanstack/react-table';
import { stringToDate } from '../stringToDate';

type Props<T extends Record<string, unknown>> = {
  row: Row<T>;
  columnId: string;
  valueFilter: {
    from: string;
    to: string;
  };
};
export function filterRangeDate<T extends Record<string, unknown>>({
  row,
  columnId,
  valueFilter,
}: Props<T>) {
  if (valueFilter.from === '' && valueFilter.to === '') {
    return true;
  }

  if (valueFilter.from !== '' && valueFilter.to !== '') {
    if (
      new Date(valueFilter.from) <= stringToDate(row.getValue(columnId)) &&
      new Date(valueFilter.to) >= stringToDate(row.getValue(columnId))
    ) {
      return true;
    }
  }
  if (
    valueFilter.from === '' &&
    new Date(valueFilter.to) >= stringToDate(row.getValue(columnId))
  ) {
    return true;
  }

  if (
    new Date(valueFilter.from) <= stringToDate(row.getValue(columnId)) &&
    valueFilter.to === ''
  ) {
    return true;
  }

  return false;
}
