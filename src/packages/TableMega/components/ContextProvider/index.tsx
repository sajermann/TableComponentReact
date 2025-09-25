import {
  ColumnDef,
  ColumnOrderState,
  FilterFnOption,
  OnChangeFn,
  RowSelectionState,
  Table,
  TableMeta,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { JSX } from "react";
import { ReactNode, createContext, useMemo } from "react";
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

export const Context = createContext({} as TContextProviderType<any>);

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
      globalFilterFn: globalFilter.globalFilterFn || "auto",
    }),

    ...(!!selection && {
      onRowSelectionChange: selection.setRowSelection,
      enableRowSelection: true,
      enableMultiRowSelection: selection?.type === "multi",
    }),
    meta,
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
    [table, columns, data, meta, expandedComponent]
  );

  return (
    <Context.Provider value={{ ...memoizedValue, expandedComponent }}>
      {children}
    </Context.Provider>
  );
}
