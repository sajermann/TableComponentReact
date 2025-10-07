import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useColumns, useTranslation } from '~/hooks';
import { TPerson } from '~/types';

export function useTableMegaSortPage() {
  const { columns } = useColumns();
  const { translate } = useTranslation();
  const columns2 = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: 'friends',
        accessorFn: e => e.friends.map(item => item.name).join(' | '),
        header: translate('FRIENDS'),
        minSize: 100,
        size: 200,
        cell: info => info.getValue(),
      },
    ],
    [translate],
  );

  return {
    columns: [...columns, ...columns2],
  };
}
