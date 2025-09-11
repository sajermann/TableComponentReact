import '@tanstack/react-table';

declare global {
  interface Window {
    store: UseBoundStore<Write<StoreApi<Props>, StorePersist<Props, Props>>>;
  }
}

declare module '@tanstack/react-table' {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: TextAlign;
    filterElement?: (data: any, dataB: any) => React.ReactNode;
    cellEdit?: (data: any) => React.ReactNode;
    resizingElement?: (data: any) => React.ReactNode;
  }
}

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}
