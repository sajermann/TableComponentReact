import { ColumnDef, TableMeta } from "@tanstack/react-table";
import { ReactNode } from "react";
import { ContextProvider } from "../ContextProvider";

type TRootProps<T, U = undefined> = {
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

export function Root<T>({
  children,
  data,
  columns,
  meta,
  sorting,
}: TRootProps<T>) {
  return (
    <ContextProvider
      data={data}
      columns={columns}
      meta={meta}
      sorting={sorting}
    >
      {children}
    </ContextProvider>
  );
}
