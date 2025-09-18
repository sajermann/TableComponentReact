import { Row, Table, flexRender } from "@tanstack/react-table";
import { Fragment } from "react";

import { TSelection } from "../../types";
import { TExpandRow } from "../../types/expand-row.type";
import { ExpandLine } from "../ExpandLine";
import { Td } from "../Td";
import { Tr } from "../Tr";

type Props<T> = {
  table: Table<T>;
  expandRow?: TExpandRow<T>;
  enableVirtualization?: boolean;
};
export function RowsWithoutVirtualization<T>({
  table,
  expandRow,
  enableVirtualization,
}: Props<T>) {
  if (enableVirtualization) return null;

  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          <Tr
            row={row}
            {...(row.getIsExpanded() ? expandRow?.parentTrProps : {})}
          >
            {row.getVisibleCells().map((cell) => (
              <Td
                key={cell.id}
                {...{
                  style: {
                    textAlign: cell.column.columnDef.meta?.align,
                  },
                }}
                title={cell.getContext().getValue() as string}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
          <ExpandLine row={row} expandRow={expandRow} />
        </Fragment>
      ))}
    </>
  );
}
