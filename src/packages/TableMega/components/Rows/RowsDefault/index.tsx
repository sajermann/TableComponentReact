import { Row, Table, flexRender } from "@tanstack/react-table";
import { Fragment } from "react";
import { useTableMega } from "~/packages/TableMega/hooks";
import { Td } from "../../Td";
import { Tr } from "../../Tr";

export type TRowsDefaultProps<T> = {
  // selection?: Omit<TSelection<T>, "disableCheckbox">;
  expandLine?: {
    render: (data: Row<T>) => React.ReactNode;
  };
  enableEllipsis?: boolean;
};
export function RowsDefault<T>({
  expandLine,
  enableEllipsis,
}: //  selection,
TRowsDefaultProps<T>) {
  const { table } = useTableMega();
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          <Tr
            row={row}
            //selection={selection}
            expandLine={expandLine}
          >
            {row.getVisibleCells().map((cell) => (
              <Td
                key={cell.id}
                {...{
                  style: {
                    textAlign: cell.column.columnDef.meta?.align,
                  },
                }}
                {...(enableEllipsis ? { title: String(cell.getValue()) } : {})}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
          {/* <ExpandLine row={row} expandLine={expandLine} /> */}
        </Fragment>
      ))}
    </>
  );
}
