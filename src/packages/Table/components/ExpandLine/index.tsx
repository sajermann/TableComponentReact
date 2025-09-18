import { Row } from "@tanstack/react-table";
import { TExpandRow } from "../../types/expand-row.type";
import { Tr } from "../Tr";

type Props<T> = {
  row: Row<T>;
  expandRow?: TExpandRow<T>;
};
export function ExpandLine<T>({ row, expandRow }: Props<T>) {
  if (!row.getIsExpanded()) return null;
  return (
    <Tr row={row} {...expandRow?.expandedTrProps}>
      <td colSpan={row.getVisibleCells().length}>{expandRow?.render(row)}</td>
    </Tr>
  );
}
