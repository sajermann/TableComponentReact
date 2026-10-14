import type {
  CellData,
  Column,
  RowData,
  Table,
  TableFeatures,
} from '@tanstack/react-table';
import '@testing-library/jest-dom/vitest';

declare global {
  interface Window {
    store: UseBoundStore<Write<StoreApi<Props>, StorePersist<Props, Props>>>;
  }
}

type TFilterElement = {
  column: Column<any, any, any>;
  table: Table<any, any>;
};

type TResizingElement = {
  header: Header<any, unknown>;
  table: Table<unknown>;
};

declare module '@tanstack/table-core' {
  interface ColumnMeta<
    in out TFeatures extends TableFeatures,
    in out TData extends RowData,
    TValue extends CellData = CellData,
  > {
    align?: TextAlign;
    filterElement?: (data: TFilterElement) => React.ReactNode;
    resizingElement?: (data: TResizingElement) => React.ReactNode;
  }
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<
    in out TFeatures extends TableFeatures,
    in out TData extends RowData,
    TValue extends CellData = CellData,
  > {
    align?: TextAlign;
    filterElement?: (data: TFilterElement) => React.ReactNode;
    resizingElement?: (data: TResizingElement) => React.ReactNode;
  }

  export type ColumnDef<
    TData,
    TValue = unknown,
  > = import('@tanstack/table-core').ColumnDef<
    import('@tanstack/table-core').StockFeatures,
    TData & import('@tanstack/table-core').RowData,
    TValue
  >;
  export type Row<TData> = import('@tanstack/table-core').Row<
    import('@tanstack/table-core').StockFeatures,
    TData & import('@tanstack/table-core').RowData
  >;
  export type Table<TData> = import('@tanstack/react-table').ReactTable<
    import('@tanstack/table-core').StockFeatures,
    TData & import('@tanstack/table-core').RowData
  >;
  export type ColumnResizingState =
    import('@tanstack/table-core').columnResizingState;
  export type Column<
    TData,
    TValue = unknown,
  > = import('@tanstack/table-core').Column<
    import('@tanstack/table-core').StockFeatures,
    TData & import('@tanstack/table-core').RowData,
    TValue
  >;
  export type Header<
    TData,
    TValue = unknown,
  > = import('@tanstack/table-core').Header<
    import('@tanstack/table-core').StockFeatures,
    TData & import('@tanstack/table-core').RowData,
    TValue
  >;
  export type HeaderContext<
    TData,
    TValue = unknown,
  > = import('@tanstack/table-core').HeaderContext<
    import('@tanstack/table-core').StockFeatures,
    TData & import('@tanstack/table-core').RowData,
    TValue
  >;
  export type TableMeta<TData> = import('@tanstack/table-core').TableMeta<
    import('@tanstack/table-core').StockFeatures,
    TData & import('@tanstack/table-core').RowData
  >;
  export type FilterFnOption<TData> =
    import('@tanstack/table-core').FilterFnOption<
      import('@tanstack/table-core').StockFeatures,
      TData & import('@tanstack/table-core').RowData
    >;
  export type FilterFn<TData> = import('@tanstack/table-core').FilterFn<
    import('@tanstack/table-core').StockFeatures,
    TData & import('@tanstack/table-core').RowData
  >;
  export function createColumnHelper<TData>(): import('@tanstack/table-core').ColumnHelper<
    import('@tanstack/table-core').StockFeatures,
    TData & import('@tanstack/table-core').RowData
  >;
}

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}
