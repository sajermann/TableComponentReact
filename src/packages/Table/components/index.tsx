import {
  ColumnDef,
  ColumnResizingState,
  ColumnSizingState,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  Table as ReactTableType,
  SortingState,
  stockFeatures,
  TableMeta,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';
import { useTanStackTableDevtools } from '@tanstack/react-table-devtools';
import { useEffect, useMemo, useRef, useState } from 'react';
import { managerClassNames } from '~/packages/Table/utils/managerClassNames';
import { TDefTools, TPagination, TSelection } from '../types';
import { TExpandRow } from '../types/expand-row.type';
import { TGlobalFilter } from '../types/global-filter.type';
import { Header } from './Header';
import styles from './index.module.css';
import { Pagination } from './Pagination';
import { Tbody } from './Tbody';
import { Tfoot } from './Tfoot';
import { Thead } from './Thead';

type Props<T extends Record<string, unknown>, U = undefined> = {
  selection?: TSelection;

  columns: ColumnDef<T, unknown>[];
  data: T[];
  isLoading?: boolean;
  expandRow?: TExpandRow<T>;

  globalFilter?: TGlobalFilter<T, U>;

  enableVirtualization?: boolean;
  pagination?: TPagination;
  meta?: TableMeta<T>;
  onResizing?: (data: {
    columnSizing: ColumnSizingState;
    columnSizingInfo?: ColumnResizingState;
    columnResizing?: ColumnResizingState;
  }) => void;

  columnVisibility?: Record<string, boolean>;
  columnOrder?: string[];
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  showFooter?: boolean;

  tableKey?: string;
  tools?: TDefTools<T>;
  sorting?: {
    manualSorting?: {
      fn: (data: Record<string, unknown>[]) => void;
    };
    disabled?: boolean;
  };
};

export function Table<T extends Record<string, unknown>, U = undefined>({
  tableKey,
  selection,
  columns,
  data,
  isLoading,
  expandRow,
  globalFilter,
  enableVirtualization,
  pagination,
  meta,
  onResizing,
  columnVisibility,
  columnOrder,
  height,
  minHeight,
  maxHeight,
  showFooter,
  tools,
  sorting,
}: Props<T, U>) {
  const [sortingInternal, setSortingInternal] = useState<SortingState>([]);
  const [globalFilterInternal, setGlobalFilterInternal] = useState('');

  const paginationState = useMemo(() => {
    if (!pagination || typeof pagination?.automatic === 'boolean') {
      return {
        onChange: undefined,
      };
    }

    if (pagination?.automatic && pagination.automatic.controlled) {
      return {
        pagination: {
          pageIndex: pagination.automatic.controlled.pageIndex || 0,
          pageSize: pagination.automatic.controlled.pageSize || 0,
        },
        onPaginationChange: pagination.automatic.controlled.onChange,
      };
    }

    if (pagination?.manual) {
      return {
        pagination: {
          pageIndex: pagination.manual.pageIndex || 0,
          pageSize: pagination.manual.pageSize || 0,
        },
        onPaginationChange: pagination.manual.onChange,
        manualPagination: true,
        rowCount: pagination.manual.rowCount,
      };
    }
  }, [pagination]);

  const features = useMemo(
    () =>
      tableFeatures({
        ...stockFeatures,
        filteredRowModel: createFilteredRowModel(),
        sortedRowModel: createSortedRowModel(),
        expandedRowModel: createExpandedRowModel(),
        ...(pagination ? { paginatedRowModel: createPaginatedRowModel() } : {}),
      }),
    [pagination],
  );

  const table = useTable({
    key: tableKey || 'Table',
    features,
    data,
    columns,
    columnResizeMode: 'onChange',
    state: {
      ...paginationState,
      sorting: sorting?.disabled ? undefined : sortingInternal,
      rowSelection: selection?.rowSelection,
      globalFilter: !globalFilter
        ? undefined
        : globalFilter?.controlled?.filter || globalFilterInternal,
      columnVisibility,
      columnOrder,
    },
    onGlobalFilterChange: !globalFilter
      ? undefined
      : globalFilter?.controlled?.setFilter || setGlobalFilterInternal,
    onRowSelectionChange: selection?.setRowSelection,
    enableRowSelection: !!selection,
    enableMultiRowSelection: selection?.type === 'multi',
    onSortingChange: sorting?.disabled
      ? undefined
      : funcUpdater => {
          if (sorting?.manualSorting) {
            const resultSorts = (
              funcUpdater as unknown as (
                dataTempOldSort: SortingState,
              ) => Record<string, unknown>[]
            )(sortingInternal);
            sorting.manualSorting.fn(resultSorts);
          }
          return setSortingInternal(funcUpdater);
        },
    getRowCanExpand: () => !!expandRow,
    ...paginationState,
    meta,
    globalFilterFn: !globalFilter
      ? undefined
      : globalFilter?.controlled?.globalFilterFn || 'auto',
    manualSorting: !!sorting?.manualSorting,
    enableMultiSort: true,
  }) as unknown as ReactTableType<T>;

  useTanStackTableDevtools(table, {
    enabled: import.meta.env.DEV && import.meta.env.MODE !== 'test',
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onResizing) {
        onResizing({
          columnSizing: table.state.columnSizing,
          columnSizingInfo: table.state.columnResizing,
          columnResizing: table.state.columnResizing,
        });
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [table.state.columnSizing]);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header
        table={table}
        searchProps={{
          show: globalFilter?.showInput,
          value:
            (globalFilter?.controlled?.filter as string) ||
            globalFilterInternal,
          onChange: e => {
            if (globalFilter?.controlled?.setFilter) {
              globalFilter?.controlled?.setFilter(
                e.target.value as unknown as U,
              );
              return;
            }
            setGlobalFilterInternal(e.target.value);
          },
        }}
        tools={tools}
      />
      <div
        ref={tableContainerRef}
        className={managerClassNames([
          'scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300',
          'scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
          styles.customContainer,
        ])}
        style={{
          overflow: isLoading ? 'hidden' : 'auto',
          height: height || undefined,
          minHeight: minHeight || undefined,
          maxHeight: maxHeight || undefined,
        }}
      >
        <table className={styles.table}>
          <Thead table={table} sorting={sorting} />

          <Tbody
            table={table}
            tableContainerRef={tableContainerRef}
            data={data}
            columns={columns}
            isLoading={isLoading}
            expandRow={expandRow}
            enableVirtualization={enableVirtualization}
          />
          <Tfoot table={table} showFooter={showFooter} />
        </table>
      </div>
      <Pagination table={table} pagination={pagination} />
    </>
  );
}
