import { useState } from "react";
import { useColumns, useTranslation } from "~/hooks";

type TResizingProps = {
  columnSizing: {
    [index: string]: number;
  };
};

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

export function useResizing() {
  const [columnSize] = useState<Record<string, number>>(() => {
    const saveds = localStorage.getItem(IDENTIFIER);

    if (!saveds) {
      return DEFAULT;
    }

    return JSON.parse(saveds);
  });

  const { columns } = useColumns(columnSize);

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

  function handleReset() {
    localStorage.removeItem(IDENTIFIER);
    window.location.reload();
  }
  return {
    handleReset,
    onResizing,
    columns,
  };
}
