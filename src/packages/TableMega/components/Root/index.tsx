import { ColumnDef, ColumnOrderState, TableMeta } from "@tanstack/react-table";
import { ReactNode } from "react";
import { ContextProvider } from "../ContextProvider";

type TRootProps<T, U = undefined> = {
  children: ReactNode;
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta?: TableMeta<T>;
  columnOrder?: ColumnOrderState;
  columnVisibility?: Record<string, boolean>;
};

export function Root<T>(props: TRootProps<T>) {
  return <ContextProvider {...props} />;
}
