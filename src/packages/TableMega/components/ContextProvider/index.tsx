import {
  ColumnDef,
  SortingState,
  Table,
  TableMeta,
  TableOptions,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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

type TContextProviderType<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta?: TableMeta<T>;
  table: Table<T>;
  registerFeature: Dispatch<SetStateAction<Partial<TableOptions<T>>>>;
  sorting?: {
    manualSorting?: {
      fn: (data: Record<string, unknown>[]) => void;
    };
    disabled?: boolean;
  };
};

export const Context = createContext({} as TContextProviderType<T>);

type TContextProviderProps<T, U = undefined> = {
  children: ReactNode;
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta?: TableMeta<T>;
  sorting?: {
    manualSorting?: {
      fn: (data: Record<string, unknown>[]) => void;
    };
    disabled?: boolean;
  };
};

export function ContextProvider<T>({
  data,
  children,
  columns,
  meta,
  sorting,
}: TContextProviderProps<T>) {
  const [extraFeatures, setExtraFeatures] = useState<Partial<TableOptions<T>>>(
    {} as TableOptions<T>
  );
  const [sortingInternal, setSortingInternal] = useState<SortingState>([]);

  console.log({ sorting });

  const table = useReactTable({
    ...extraFeatures,
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
      // sorting: sorting?.disabled ? undefined : sortingInternal,
      // rowSelection: selection?.rowSelection,
      // globalFilter: globalFilter?.filter,
      // columnVisibility,
      // columnOrder,
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
    // getSortedRowModel: getSortedRowModel(),
    // getRowCanExpand: () => !!expandLine,
    // getExpandedRowModel: getExpandedRowModel(),
    // manualPagination: pagination?.automatic ? undefined : true,
    // getPaginationRowModel: pagination?.automatic
    //   ? getPaginationRowModel()
    //   : undefined,
    // onPaginationChange: pagination?.setPagination,
    meta,
    // globalFilterFn: globalFilter?.globalFilterFn || "auto",
    manualSorting: !!sorting?.manualSorting,
    enableMultiSort: true,
  });
  // console.log(extraFeatures);

  const memoizedValue = useMemo<TContextProviderType<T>>(
    () => ({
      table,
      columns,
      data,
      meta,
      registerFeature: setExtraFeatures,
      sorting,
    }),
    [table, columns, data, meta, setExtraFeatures, sorting]
  );

  return (
    <Context.Provider
      value={{
        table,
        columns,
        data,
        meta,
        registerFeature: setExtraFeatures,
        sorting,
      }}
    >
      {children}
    </Context.Provider>
  );
}
