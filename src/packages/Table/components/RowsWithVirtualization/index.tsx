import { Row, flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Fragment, RefObject, useEffect, useState } from "react";
import { TExpandRow } from "../../types/expand-row.type";
import { ExpandLine } from "../ExpandLine";
import { Td } from "../Td";
import { Tr } from "../Tr";

type Props<T> = {
  rows: Row<T>[];
  enableVirtualization?: boolean;
  expandRow?: TExpandRow<T>;
  tableContainerRef: RefObject<HTMLDivElement | null>;
};
export function RowsWithVirtualization<T>({
  rows,
  enableVirtualization,
  expandRow,
  tableContainerRef,
}: Props<T>) {
  const [_, setFisrtRender] = useState(false);
  const { getVirtualItems, getTotalSize } = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 68,
    overscan: 10,
  });

  const paddingTop =
    getVirtualItems().length > 0 ? getVirtualItems()?.[0]?.start || 0 : 0;
  const paddingBottom =
    getVirtualItems().length > 0
      ? getTotalSize() -
          (getVirtualItems()?.[getVirtualItems().length - 1]?.end || 0) || 0
      : 0;

  useEffect(() => {
    if (tableContainerRef.current) {
      setFisrtRender(true);
    }
  }, [tableContainerRef]);

  if (!enableVirtualization) return null;

  return (
    <>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index];
        return (
          <Fragment key={row.id}>
            <Tr
              row={row}
              {...(row.getIsExpanded() ? expandRow?.parentTrProps : {})}
            >
              {row.getVisibleCells().map((cell) => (
                <Td
                  {...{
                    style: {
                      textAlign: cell.column.columnDef.meta?.align,
                    },
                  }}
                  title={cell.getContext().getValue() as string}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>

            <ExpandLine row={row} expandRow={expandRow} />
          </Fragment>
        );
      })}
      {paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </>
  );
}
