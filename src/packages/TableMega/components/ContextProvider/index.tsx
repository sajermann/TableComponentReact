import {
  ColumnDef,
  ColumnSort,
  OnChangeFn,
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
  sorting?: {
    manualSorting?: {
      fn: (data: Record<string, unknown>[]) => void;
    };
    disabled?: boolean;
  };
  setEnableSorting: (data: boolean) => void;
  setControlledSort: Dispatch<
    SetStateAction<
      | {
          sort: SortingState;
          setSort: Dispatch<SetStateAction<SortingState>>;
        }
      | undefined
    >
  >;
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
}: //sorting,
TContextProviderProps<T>) {
  const [sortingInternal, setSortingInternal] = useState<SortingState>([]);
  const [enableSorting, setEnableSorting] = useState(false);
  const [controlledSort, setControlledSort] = useState<
    | {
        sort: SortingState;
        setSort: Dispatch<SetStateAction<SortingState>>;
      }
    | undefined
  >(undefined);

  console.log({ controlledSort });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    // getFilteredRowModel: getFilteredRowModel(),
    // pageCount: pagination?.pageCount,
    // state: {
    // pagination: {
    //   pageIndex: pagination?.pageIndex || 0,
    //   pageSize: pagination?.pageSize || 0,
    // },
    // sorting: controlledSort ? controlledSort.sort : undefined,
    // rowSelection: selection?.rowSelection,
    // globalFilter: globalFilter?.filter,
    // columnVisibility,
    // columnOrder,
    // },
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
    onSortingChange: controlledSort ? controlledSort.setSort : undefined,
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
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    // getRowCanExpand: () => !!expandLine,
    // getExpandedRowModel: getExpandedRowModel(),
    // manualPagination: pagination?.automatic ? undefined : true,
    // getPaginationRowModel: pagination?.automatic
    //   ? getPaginationRowModel()
    //   : undefined,
    // onPaginationChange: pagination?.setPagination,
    meta,
    // globalFilterFn: globalFilter?.globalFilterFn || "auto",
    // manualSorting: !!sorting?.manualSorting,
    enableMultiSort: true,
  });
  // console.log(extraFeatures);

  const memoizedValue = useMemo<TContextProviderType<T>>(
    () => ({
      table,
      columns,
      data,
      meta,
      //sorting,
      setEnableSorting,
    }),
    [
      table,
      columns,
      data,
      meta,
      //  sorting
    ]
  );

  return (
    <Context.Provider
      value={{
        table,
        columns,
        data,
        meta,
        setEnableSorting,
        setControlledSort,
        //sorting,
      }}
    >
      {children}
    </Context.Provider>
  );
}
