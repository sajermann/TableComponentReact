import {
  CellContext,
  ColumnDef,
  ColumnSizingInfoState,
  ColumnSizingState,
  FilterFnOption,
  HeaderContext,
  Row,
  SortingState,
  TableMeta,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { TDefTools, TPagination, TSelection } from "../types";

import { Header } from "./Header";
import { Pagination } from "./Pagination";
import { Tbody } from "./Tbody";
import { Tfoot } from "./Tfoot";
import { Thead } from "./Thead";

import { useTranslation } from "~/hooks/useTranslation";
import { RadioGroup } from "~/packages/Table/components/Radio";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";
import { TExpandRow } from "../types/expand-row.type";
import { getValueForRadio } from "../utils";

import { TGlobalFilter } from "../types/global-filter.type";
import { Selector } from "./Selector";
import styles from "./index.module.css";

type Props<T, U = undefined> = {
  selection?: TSelection<T>;

  columns: ColumnDef<T, unknown>[];
  data: T[];
  isLoading?: boolean;
  expandRow?: TExpandRow<T>;

  globalFilter?: TGlobalFilter<T>;

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

  function buildColumns() {
    const result: ColumnDef<T, unknown>[] = [];

    // if (selection && !selection.disableCheckbox) {
    //   const t = [
    //     {
    //       id: "select",
    //       header: ({ table }: HeaderContext<T, unknown>) => (
    //         <Selector selection={selection} table={table} />
    //       ),
    //       size: 50,
    //       minSize: 50,
    //       maxSize: 50,
    //       meta: {
    //         align: "center",
    //       },
    //       enableSorting: false,
    //       enableResizing: false,
    //       cell: ({ row }: CellContext<T, unknown>) => (
    //         <Selector row={row} selection={selection} />
    //       ),
    //     },
    //   ];
    //   result.push(t as unknown as ColumnDef<T, unknown>);
    // }

    result.push(columns as unknown as ColumnDef<T, unknown>);
    return result.flat();
  }

  const table = useReactTable({
    data,
    columns: buildColumns(),
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: pagination?.pageCount,
    state: {
      pagination: {
        pageIndex: pagination?.pageIndex || 0,
        pageSize: pagination?.pageSize || 0,
      },
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
    manualPagination: pagination?.automatic ? undefined : true,
    getPaginationRowModel: pagination?.automatic
      ? getPaginationRowModel()
      : undefined,
    onPaginationChange: pagination?.setPagination,
    meta,
    globalFilterFn: !globalFilter
      ? undefined
      : globalFilter?.globalFilterFn || "auto",
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
          value: globalFilter?.controlled?.filter || globalFilterInternal,
          onChange: (e) => {
            if (globalFilter?.controlled?.setFilter) {
              globalFilter?.controlled?.setFilter(e.target.value);
              return;
            }
            setGlobalFilterInternal(e.target.value);
          },
        }}
        tools={tools}
      />
      <div
        ref={tableContainerRef}
        className={managerClassNames({
          [styles.customContainer]: true,
          "scrollbar-thin": true,
          "scrollbar-thumb-gray-500": true,
          "scrollbar-track-gray-300": true,
          "scrollbar-thumb-rounded-full": true,
          "scrollbar-track-rounded-full": true,
        })}
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
