import { Header, Table } from "@tanstack/react-table";
import { useEffect } from "react";
import styles from "./index.module.css";
import { onResizing } from "./utils";

export function Resizing<T>({
  header,
  table,
}: {
  header: Header<T, unknown>;
  table: Table<T>;
}) {
  if (!header.column.getCanResize()) return null;

  useEffect(() => {
    const timeout = setTimeout(() => {
      onResizing({
        columnSizing: table.getState().columnSizing,
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [table.getState().columnSizing]);

  return (
    <div
      {...{
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: `${styles.resizer} ${
          header.column.getIsResizing() ? styles.isResizing : ""
        }`,
      }}
    />
  );
}
