import { OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useTableMega } from '../../../hooks';
import { Main } from '../Main';

export type TPaginationAutomaticProps = {
  disabled?: boolean;
  pageIndex?: number;
  pageSize?: number;
  onPaginationChange?: OnChangeFn<PaginationState>;
};

export function Automatic({
  disabled,
  pageIndex = 0,
  pageSize = 10,
  onPaginationChange,
}: TPaginationAutomaticProps) {
  const { table } = useTableMega();

  useEffect(() => {
    table.setOptions(prev => ({
      ...prev,
      manualPagination: false,
      ...(onPaginationChange ? { onPaginationChange } : {}),
      state: {
        ...prev.state,
        pagination: {
          pageIndex,
          pageSize,
        },
      },
    }));
  }, [pageIndex, pageSize, onPaginationChange]);

  return <Main disabled={disabled} />;
}
