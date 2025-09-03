import { Row, flexRender } from "@tanstack/react-table";
import { Td } from "../../../Td";
import { Tr } from "../../../Tr";
import { TCommonProps } from "../types";

type TTrCompleteProps<T> = {
  row: Row<T>;
  enableEllipsis?: boolean;
  parentTrProps?: TCommonProps;
};

export function TrComplete<T>({
  row,
  enableEllipsis,
  parentTrProps,
}: TTrCompleteProps<T>) {
  return (
    <Tr
      row={row}
      //selection={selection}
      {...parentTrProps}
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
  );
}
