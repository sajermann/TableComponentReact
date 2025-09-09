import { Row } from "@tanstack/react-table";
import { Fragment } from "react";
import { useTableMega } from "~/packages/TableMega/hooks";
import { TrComplete } from "../TrComplete";

export type TDefaultProps<T> = {
  enableEllipsis?: boolean;
  onClickRow?: ({ row }: { row: Row<T> }) => void;
};
export function Default<T>({ enableEllipsis, onClickRow }: TDefaultProps<T>) {
  const { table } = useTableMega();
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          <TrComplete
            row={row}
            enableEllipsis={enableEllipsis}
            onClickRow={onClickRow}
          />
        </Fragment>
      ))}
    </>
  );
}
