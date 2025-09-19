import {
  ColumnDef,
  ColumnSizingInfoState,
  ColumnSizingState,
  SortingState,
  TableMeta,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";

import { TDefTools, TPagination, TSelection } from "../types";

import { Header } from "./Header";
import { Pagination } from "./Pagination";
import { Tbody } from "./Tbody";
import { Tfoot } from "./Tfoot";
import { Thead } from "./Thead";

import { managerClassNames } from "~/packages/Table/utils/managerClassNames";
import { TExpandRow } from "../types/expand-row.type";

import { TGlobalFilter } from "../types/global-filter.type";
import styles from "./index.module.css";

type Props<T, U = undefined> = {
  selection?: TSelection<T>;

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
    columnSizingInfo: ColumnSizingInfoState;
  }) => void;

  columnVisibility?: Record<string, boolean>;
  columnOrder?: string[];
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  showFooter?: boolean;

  tools?: TDefTools<T>;
  sorting?: {
    manualSorting?: {
      fn: (data: Record<string, unknown>[]) => void;
    };
    disabled?: boolean;
  };
};

export function Table<T, U = undefined>({
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
  const [globalFilterInternal, setGlobalFilterInternal] = useState("");

  const paginationState = useMemo(() => {
    if (!pagination || typeof pagination?.automatic === "boolean") {
      return {
        onChange: undefined,
        getPaginationRowModel:
          pagination?.automatic === true ? getPaginationRowModel() : undefined,
      };
    }

    if (pagination?.automatic && pagination.automatic.controlled) {
      return {
        pagination: {
          pageIndex: pagination.automatic.controlled.pageIndex || 0,
          pageSize: pagination.automatic.controlled.pageSize || 0,
        },
        onPaginationChange: pagination.automatic.controlled.onChange,
        getPaginationRowModel: getPaginationRowModel(),
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getFilteredRowModel: getFilteredRowModel(),
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
    enableMultiRowSelection: selection?.type === "multi",
    onSortingChange: sorting?.disabled
      ? undefined
      : (funcUpdater) => {
          if (sorting?.manualSorting) {
            const resultSorts = (
              funcUpdater as unknown as (
                dataTempOldSort: SortingState
              ) => Record<string, unknown>[]
            )(sortingInternal);
            sorting.manualSorting.fn(resultSorts);
          }
          return setSortingInternal(funcUpdater);
        },
    getSortedRowModel: getSortedRowModel(),
    getRowCanExpand: () => !!expandRow,
    getExpandedRowModel: getExpandedRowModel(),
    ...paginationState,
    meta,
    globalFilterFn: !globalFilter
      ? undefined
      : globalFilter?.controlled?.globalFilterFn || "auto",
    manualSorting: !!sorting?.manualSorting,
    enableMultiSort: true,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onResizing) {
        onResizing({
          columnSizing: table.getState().columnSizing,
          columnSizingInfo: table.getState().columnSizingInfo,
        });
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [table.getState().columnSizing]);

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
          onChange: (e) => {
            if (globalFilter?.controlled?.setFilter) {
              globalFilter?.controlled?.setFilter(e.target.value as any);
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
          "scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300",
          "scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
          styles.customContainer,
        ])}
        style={{
          overflow: isLoading ? "hidden" : "auto",
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
