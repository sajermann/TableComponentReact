import {
  ColumnDef,
  ColumnOrderState,
  ColumnResizingState,
  ColumnSizingState,
  columnFilteringFeature,
  columnOrderingFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  FilterFnOption,
  filterFns,
  globalFilteringFeature,
  OnChangeFn,
  Table as ReactTableType,
  RowSelectionState,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  SortingState,
  sortFns,
  stockFeatures,
  Table,
  TableMeta,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';
import { useTanStackTableDevtools } from '@tanstack/react-table-devtools';
import React, { createContext, JSX, ReactNode, useMemo } from 'react';
import { OnExpanded } from '../OnExpanded';

const tableFeaturesConfig = tableFeatures({
  columnVisibilityFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnOrderingFeature,
  rowSortingFeature,
  rowSelectionFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  sortFns,
  filterFns,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  expandedRowModel: createExpandedRowModel(),
});

function getExpandComponent(children: ReactNode) {
  let expandedComponent: JSX.Element | null = null;
  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && child.type === OnExpanded) {
      expandedComponent = (child?.props as any)?.children;
    }
  });
  return expandedComponent;
}

export type TContextProviderType<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta?: TableMeta<T>;
  table: Table<T>;
  expandedComponent?: React.ReactNode;
};

export const Context = createContext({} as TContextProviderType<unknown>);

export type TContextProviderProps<T, U = undefined> = {
  tableKey?: string;
  children: ReactNode;
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta?: TableMeta<T>;
  columnOrder?: ColumnOrderState;
  columnVisibility?: Record<string, boolean>;
  globalFilter?: {
    filter: U;
    onChange: (data: U) => void;
    globalFilterFn?: FilterFnOption<T>;
  };
  selection?: {
    type: 'multi' | 'single';
    rowSelection: RowSelectionState;
    setRowSelection: OnChangeFn<RowSelectionState>;
  };
};

export function ContextProvider<T extends Record<string, unknown>, U>({
  tableKey,
  data,
  children,
  columns,
  meta,
  columnOrder,
  columnVisibility,
  globalFilter,
  selection,
}: TContextProviderProps<T, U>) {
  const table = useTable({
    key: tableKey || 'TableMega',
    features: tableFeaturesConfig as unknown as typeof stockFeatures,
    data,
    columns,
    manualPagination: true,
    ...(columns.some(col => col.meta?.resizingElement) && {
      columnResizeMode: 'onChange',
    }),
    state: {
      ...(!!selection && {
        rowSelection: selection.rowSelection,
      }),
      ...(!!globalFilter && {
        globalFilter: globalFilter.filter,
      }),

      columnVisibility,
      columnOrder,
    },

    ...(!!globalFilter?.onChange && {
      onGlobalFilterChange: globalFilter.onChange,
    }),

    ...(!!globalFilter && {
      globalFilterFn: globalFilter.globalFilterFn || 'auto',
    }),

    ...(!!selection && {
      onRowSelectionChange: selection.setRowSelection,
      enableRowSelection: true,
      enableMultiRowSelection: selection?.type === 'multi',
    }),
    meta,
  }) as unknown as Table<T>;

  useTanStackTableDevtools(table, {
    enabled: import.meta.env.DEV && import.meta.env.MODE !== 'test',
  });

  const expandedComponent = getExpandComponent(children);

  const memoizedValue = useMemo<TContextProviderType<T>>(
    () => ({
      table,
      columns,
      data,
      meta,
      expandedComponent,
    }),
    [table, columns, data, meta, expandedComponent],
  );

  return (
    <Context.Provider
      value={
        {
          ...memoizedValue,
          expandedComponent,
        } as unknown as TContextProviderType<unknown>
      }
    >
      {children}
    </Context.Provider>
  );
}
