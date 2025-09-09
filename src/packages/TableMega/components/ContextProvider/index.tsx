import {
  ColumnDef,
  ColumnOrderState,
  ColumnSort,
  FilterFnOption,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  Table,
  TableMeta,
  TableOptions,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { JSX } from "react";
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { OnExpanded } from "../OnExpanded";

function getExpandComponent(children: ReactNode) {
  let expandedComponent: JSX.Element | null = null;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === OnExpanded) {
      expandedComponent = (child?.props as any)?.children;
    }
  });
  return expandedComponent;
}

type TContextProviderType<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta?: TableMeta<T>;
  table: Table<T>;
  expandedComponent?: React.ReactNode;
};

export const Context = createContext({} as TContextProviderType<T>);

export type TContextProviderProps<T, U = undefined> = {
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
    type: "multi" | "single";
    rowSelection: { [index: number]: boolean };
    setRowSelection: OnChangeFn<RowSelectionState>;
  };
};

export function ContextProvider<T, U>({
  data,
  children,
  columns,
  meta,
  columnOrder,
  columnVisibility,
  globalFilter,
  selection,
}: TContextProviderProps<T, U>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(columns.some((col) => col.meta?.resizingElement) && {
      columnResizeMode: "onChange",
    }),
    ...((columns.some((col) => col.filterFn) || !!globalFilter) && {
      getFilteredRowModel: getFilteredRowModel(),
    }),
    // pageCount: pagination?.pageCount,
    state: {
      // pagination: {
      //   pageIndex: pagination?.pageIndex || 0,
      //   pageSize: pagination?.pageSize || 0,
      // },
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
      globalFilterFn: globalFilter.globalFilterFn || "auto",
    }),

    ...(!!selection && {
      onRowSelectionChange: selection.setRowSelection,
      enableRowSelection: true,
      enableMultiRowSelection: selection?.type === "multi",
    }),

    // manualPagination: pagination?.automatic ? undefined : true,
    // getPaginationRowModel: pagination?.automatic
    //   ? getPaginationRowModel()
    //   : undefined,
    // onPaginationChange: pagination?.setPagination,
    meta,
  });

  const expandedComponent = getExpandComponent(children);

  const memoizedValue = useMemo<TContextProviderType<T>>(
    () => ({
      table,
      columns,
      data,
      meta,
    }),
    [table, columns, data, meta]
  );

  return (
    <Context.Provider
      value={{
        table,
        columns,
        data,
        meta,
        expandedComponent,
      }}
    >
      {children}
    </Context.Provider>
  );
}
