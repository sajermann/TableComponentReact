import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { RefObject } from "react";

import { useDarkMode } from "~/hooks/useDarkMode";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";
import { TExpandRow } from "../../types/expand-row.type";
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
  expandRow?: TExpandRow<T>;
  enableVirtualization?: boolean;
};

export function Tbody<T>({
  table,
  tableContainerRef,
  data,
  isLoading,
  columns,
  expandRow,
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
      <NoData columns={columns} data={data} isLoading={isLoading} />
      <IsLoading columns={columns} data={data} isLoading={isLoading} />
      <RowsWithoutVirtualization
        table={table}
        enableVirtualization={enableVirtualization}
        expandRow={expandRow}
      />

      <RowsWithVirtualization
        tableContainerRef={tableContainerRef}
        enableVirtualization={enableVirtualization}
        rows={rows}
        expandRow={expandRow}
      />
    </tbody>
  );
}
