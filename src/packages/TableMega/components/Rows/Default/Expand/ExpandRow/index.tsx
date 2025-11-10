import { Row } from "@tanstack/react-table";
import React, { cloneElement } from "react";
import { useTableMega } from "../../../../../hooks";
import { Tr } from "../../../../Tr";
import { TCommonProps } from "../../types";

type Props<T> = {
  row: Row<T>;
  expandedTrProps?: TCommonProps;
};
export function ExpandRow<T>({ row, expandedTrProps }: Props<T>) {
  const { expandedComponent } = useTableMega();
  if (!row.getIsExpanded() || !React.isValidElement(expandedComponent)) {
    return null;
  }

  return (
    <Tr row={row} {...expandedTrProps}>
      <td colSpan={row.getVisibleCells().length}>
        {cloneElement(expandedComponent, { row } as any)}
      </td>
    </Tr>
  );
}
