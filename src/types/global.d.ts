import '@tanstack/react-table';

declare global {
  interface Window {
    store: UseBoundStore<Write<StoreApi<Props>, StorePersist<Props, Props>>>;
  }
}

type TFilterElement = {
  column: Column<T, unknown>;
  table: Table<T>;
};

declare module '@tanstack/react-table' {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: TextAlign;
    filterElement?: (data: TFilterElement) => React.ReactNode;
    resizingElement?: (data: any) => React.ReactNode;
  }
}

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}
