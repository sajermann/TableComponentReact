import {
  ColumnDef,
  ColumnOrderState,
  ColumnSort,
  OnChangeFn,
  SortingState,
  Table,
  TableMeta,
  TableOptions,
  getCoreRowModel,
  getExpandedRowModel,
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

type TContextProviderType<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta?: TableMeta<T>;
  table: Table<T>;
  expandedComponent?: React.ReactNode;
};

export const Context = createContext({} as TContextProviderType<T>);

type TContextProviderProps<T, U = undefined> = {
  children: ReactNode;
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta?: TableMeta<T>;
  columnOrder?: ColumnOrderState;
  columnVisibility?: Record<string, boolean>;
};

export function ContextProvider<T>({
  data,
  children,
  columns,
  meta,
  columnOrder,
  columnVisibility,
}: TContextProviderProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    // getFilteredRowModel: getFilteredRowModel(),
    // pageCount: pagination?.pageCount,
    state: {
      // pagination: {
      //   pageIndex: pagination?.pageIndex || 0,
      //   pageSize: pagination?.pageSize || 0,
      // },
      // sorting: controlledSort ? controlledSort.sort : sortingInternal,
      // rowSelection: selection?.rowSelection,
      // globalFilter: globalFilter?.filter,
      columnVisibility,
      columnOrder,
    },
    // onGlobalFilterChange: globalFilter?.setFilter,
    // onRowSelectionChange: selection?.setRowSelection,
    // enableRowSelection: selection !== undefined,
    // enableMultiRowSelection: selection?.type === "multi",
    // onSortingChange: sorting?.disabled
    //   ? undefined
    //   : (funcUpdater) => {
    //       if (sorting?.manualSorting) {
    //         const resultSorts = (
    //           funcUpdater as unknown as (
    //             dataTempOldSort: SortingState
    //           ) => Record<string, unknown>[]
    //         )(sortingInternal);
    //         sorting.manualSorting.fn(resultSorts);
    //       }
    //       return setSortingInternal(funcUpdater);
    //     },
    // onSortingChange: controlledSort
    //   ? controlledSort.setSort
    //   : setSortingInternal,
    // onSortingChange: !controlledSort
    //   ? undefined
    //   : (funcUpdater) => {
    //       if (controlledSort?.sort) {
    //         const resultSorts = (
    //           funcUpdater as unknown as (
    //             dataTempOldSort: SortingState
    //           ) => Record<string, unknown>[]
    //         )(controlledSort.sort);
    //         console.log({ resultSorts });
    //         controlledSort.setSort(resultSorts as any);
    //       }
    //       return controlledSort.setSort(funcUpdater);
    //       // return setSortingInternal(funcUpdater);
    //     },
    // getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    // getRowCanExpand: () => true,
    // getExpandedRowModel: getExpandedRowModel(),
    // manualPagination: pagination?.automatic ? undefined : true,
    // getPaginationRowModel: pagination?.automatic
    //   ? getPaginationRowModel()
    //   : undefined,
    // onPaginationChange: pagination?.setPagination,
    meta,
    // globalFilterFn: globalFilter?.globalFilterFn || "auto",
    // manualSorting: !!sorting?.manualSorting,
    // enableMultiSort: true,
  });
  // console.log(extraFeatures);

  let expandedComponent: JSX.Element | null = null;

  React.Children.forEach(children, (child) => {
    // console.log(`sajermann`, children, child);
    if (React.isValidElement(child) && child.type === OnExpanded) {
      expandedComponent = (child?.props as any)?.children;
    }
  });
  // Identifique filhos do tipo ComponentExpanded
  // React.Children.forEach(children, child => {
  //   if (React.isValidElement(child) && child.type === TableMega.ComponentExpanded) {
  //     expandedComponent = child.props.children;
  //   }
  // });

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
