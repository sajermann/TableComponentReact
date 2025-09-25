import { Column, Table as TTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import { TPerson } from "~/types";
import { PopoverBase } from "../PopoverBase";

type Props2 = {
  column: Column<TPerson, unknown>;
  table: TTable<TPerson>;
  propForFilter: keyof TPerson;
};

export function FilterColumnBySelect({ column, table, propForFilter }: Props2) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionsChecked, setOptionsChecked] = useState<string[]>([]);
  useEffect(() => {
    setOptionsChecked((column.getFilterValue() as string[]) || []);
  }, [isOpen]);

  const options = useMemo(() => {
    const myRows = table
      .getCoreRowModel()
      .flatRows.map((item) => item.original);
    return myRows.map((item) => {
      if (typeof item[propForFilter] === "string") {
        return {
          value: item[propForFilter],
          label: item[propForFilter],
        };
      }
      return {
        value: "N",
        label: "N",
      };
    });
  }, [table.getCoreRowModel().flatRows]);

  const funnelFilled = useMemo(() => {
    const filterValueTemp = column.getFilterValue();
    return !(!filterValueTemp || (filterValueTemp as string[]).length === 0);
  }, [column.getFilterValue()]);

  return (
    <PopoverBase
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClear={() => column.setFilterValue(undefined)}
      onSave={() => column.setFilterValue(optionsChecked)}
      funnelFilled={funnelFilled}
    >
      <div className="grid grid-cols-2 gap-2 items-center justify-center">
        {options.map((column) => (
          <div
            className="w-[50%] text-center col-span-1 flex gap-2"
            key={column.value}
          >
            <input
              checked={!!optionsChecked.find((opt) => opt === column.value)}
              id={column.label}
              type="checkbox"
              onChange={({ target }) => {
                setOptionsChecked((prev) => {
                  if (!target.checked) {
                    return prev.filter((p) => p !== column.value);
                  }
                  return [...prev, column.value];
                });
              }}
            />
            <label htmlFor={column.label}>{column.label}</label>
          </div>
        ))}
      </div>
    </PopoverBase>
  );
}
