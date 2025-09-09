import { Header, Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useTableMega } from "~/packages/TableMega/hooks";
import styles from "./index.module.css";

const IDENTIFIER = `${import.meta.env.VITE_APPLICATION_IDENTIFIER}:resizing`;

const DEFAULT = {
  id: 100,
  avatar: 60,
  name: 100,
  lastName: 100,
  birthday: 100,
  email: 100,
  role: 100,
  isActive: 100,
  friends: 100,
};

type TResizingProps = {
  columnSizing: {
    [index: string]: number;
  };
};

function onResizing(dataSizing: TResizingProps) {
  const keys = Object.keys(dataSizing.columnSizing);
  if (keys.length === 0) return;

  const saveds = localStorage.getItem(IDENTIFIER);

  const newDefault = saveds ? JSON.parse(saveds) : { ...DEFAULT };

  for (const item of keys) {
    newDefault[item] = dataSizing.columnSizing[item];
  }
  localStorage.setItem(IDENTIFIER, JSON.stringify(newDefault));
}

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
