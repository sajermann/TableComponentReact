import { flexRender, getExpandedRowModel } from "@tanstack/react-table";
import { CSSProperties, Fragment, useEffect, useState } from "react";
import { useTableMega } from "~/packages/TableMega/hooks";
import { Td } from "../../../Td";
import { Tr } from "../../../Tr";
import { TrComplete } from "../TrComplete";
import { TCommonProps } from "../types";
import { ExpandRow } from "./ExpandRow";

export type TExpandProps = {
  enableEllipsis?: boolean;
  parentTrProps?: TCommonProps;
  expandedTrProps?: TCommonProps;
};
export function Expand({
  enableEllipsis,
  parentTrProps,
  expandedTrProps,
}: //  selection,
TExpandProps) {
  const { table } = useTableMega();
  const [_, setIsFirstRender] = useState(false);

  useEffect(() => {
    table.setOptions((prev) => ({
      ...prev,
      getRowCanExpand: () => true,
      getExpandedRowModel: getExpandedRowModel(),
    }));
    setTimeout(() => {
      setIsFirstRender(true);
    }, 1);
  }, []);

  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          <TrComplete
            row={row}
            enableEllipsis={enableEllipsis}
            parentTrProps={row.getIsExpanded() ? parentTrProps : undefined}
          />
          <ExpandRow row={row} expandedTrProps={expandedTrProps} />
        </Fragment>
      ))}
    </>
  );
}
