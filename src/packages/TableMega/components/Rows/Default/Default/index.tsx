import { flexRender } from "@tanstack/react-table";
import { Fragment } from "react";
import { useTableMega } from "~/packages/TableMega/hooks";
import { Td } from "../../../Td";
import { Tr } from "../../../Tr";
import { TrComplete } from "../TrComplete";

export type TDefaultProps = {
  enableEllipsis?: boolean;
};
export function Default({
  enableEllipsis,
}: //  selection,
TDefaultProps) {
  const { table } = useTableMega();
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          <TrComplete row={row} enableEllipsis={enableEllipsis} />
        </Fragment>
      ))}
    </>
  );
}
