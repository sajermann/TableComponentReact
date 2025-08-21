import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { RefObject } from "react";

import { useDarkMode } from "~/hooks/useDarkMode";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";
import { TSelection } from "../../types";
import { IsLoading } from "../IsLoading";
import { NoData } from "../NoData";
import { RowsWithVirtualization } from "../RowsWithVirtualization";
import { RowsWithoutVirtualization } from "../RowsWithoutVirtualization";

type Props<T> = {
  table: Table<T>;
  tableContainerRef: RefObject<HTMLDivElement | null>;
  data: T[];
  isLoading?: boolean;
  columns: ColumnDef<T>[];
  selection?: Omit<TSelection<T>, "disableCheckbox">;
  expandLine?: {
    render: (data: Row<T>) => React.ReactNode;
  };
  rowForUpdate?: { row: number; data: T } | null;
  enableVirtualization?: boolean;
};

export function Tbody<T>({
  table,
  tableContainerRef,
  data,
  isLoading,
  columns,
  selection,
  expandLine,
  rowForUpdate,
  enableVirtualization,
}: Props<T>) {
  const { rows } = table.getRowModel();
  const { darkMode } = useDarkMode();

  return (
    <tbody
      className={managerClassNames({
        "[&>*:nth-child(odd)]:bg-dark-500": darkMode,
        "[&>*:nth-child(odd)]:bg-[#f2f2f2]": !darkMode,
      })}
      style={{
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      <NoData
        columns={columns}
        data={data}
        isLoading={isLoading}
        expandLine={expandLine}
        selection={selection}
      />
      <IsLoading
        columns={columns}
        data={data}
        isLoading={isLoading}
        expandLine={expandLine}
        selection={selection}
      />
      <RowsWithoutVirtualization
        table={table}
        enableVirtualization={enableVirtualization}
        expandLine={expandLine}
        rowForUpdate={rowForUpdate}
        selection={selection}
      />

      <RowsWithVirtualization
        tableContainerRef={tableContainerRef}
        enableVirtualization={enableVirtualization}
        rows={rows}
        expandLine={expandLine}
        rowForUpdate={rowForUpdate}
        selection={selection}
      />
    </tbody>
  );
}
