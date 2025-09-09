import { Row, flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Fragment, RefObject, useEffect, useState } from "react";
import { useTableMega } from "~/packages/TableMega/hooks";
import { Td } from "../../Td";
import { Tr } from "../../Tr";

type TRowsVirtualizedProps = {
  containerRef: RefObject<HTMLDivElement | null>;
};
export function Virtualized({ containerRef }: TRowsVirtualizedProps) {
  const { table } = useTableMega();
  const { rows } = table.getRowModel();
  const [_, setFisrtRender] = useState(false);

  const { getVirtualItems, getTotalSize } = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
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
    if (containerRef.current) {
      setFisrtRender(true);
    }
  }, [containerRef]);

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
            <Tr row={row}>
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
