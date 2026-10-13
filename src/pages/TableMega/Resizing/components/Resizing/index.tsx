import { Header, Table } from '@tanstack/react-table';
import { useEffect } from 'react';
import styles from './index.module.css';
import { onResizing } from './utils';

export function Resizing<T>({
  header,
  table,
}: {
  header: Header<T, unknown>;
  table: Table<T>;
}) {
  if (!header.column.getCanResize()) return null;

  const columnSizing = table.state?.columnSizing;

  useEffect(() => {
    const timeout = setTimeout(() => {
      onResizing({
        columnSizing,
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [columnSizing]);

  return (
    <div
      {...{
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: `${styles.resizer} ${
          header.column.getIsResizing() ? styles.isResizing : ''
        }`,
      }}
    />
  );
}
