import { OnChangeFn, SortingState } from '@tanstack/react-table';
import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import { useTableMega } from '~/packages/TableMega/hooks';
import { RowsWithSort } from '../RowsWithSort';
import { THeadDefaultInternal } from '../THeadDefaultInternal';

export type TSortProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
> & {
  controlled?: {
    sort: SortingState;
    setSort: OnChangeFn<SortingState>;
  };
  manualSorting?: boolean;
};
export function Sort({ controlled, manualSorting, ...rest }: TSortProps) {
  const { table } = useTableMega();

  useEffect(() => {
    if (!controlled) {
      return;
    }

    if (controlled && controlled.sort) {
      if (
        'setState' in table &&
        typeof (
          table as { setState?: (fn: () => { sorting: SortingState }) => void }
        ).setState === 'function'
      ) {
        (
          table as { setState: (fn: () => { sorting: SortingState }) => void }
        ).setState(() => ({
          sorting: controlled.sort,
        }));
      }
      table.setOptions(prev => ({
        ...prev,
        manualSorting: !!manualSorting,
        state: {
          ...prev?.state,
          sorting: controlled.sort,
        },
        onSortingChange: controlled.setSort,
      }));
    }
  }, [controlled]);

  return (
    <THeadDefaultInternal {...rest}>
      <RowsWithSort />
    </THeadDefaultInternal>
  );
}
