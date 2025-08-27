import { Column, Table as TTable } from "@tanstack/react-table";
import { FunnelIcon, SaveIcon, TrashIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button, ContainerInput } from "~/components";
import { Popover } from "~/components/Popover";

import { TPerson } from "~/types";

type Props2 = {
  column: Column<TPerson, string>;
  table: TTable<TPerson>;
  propForFilter: keyof TPerson;
};

export function FilterColumnBySelect({ column, table, propForFilter }: Props2) {
  const [isOpen, setIsOpen] = useState(false);

  console.log("sajermann - lindo", column.getFilterValue());
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

  function verifyFillFilter() {
    const filterValueTemp = column.getFilterValue();
    if (!filterValueTemp || (filterValueTemp as string[]).length === 0) {
      return false;
    }
    return true;
  }

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onInteractOutside={() => setIsOpen(false)}
      trigger={
        <button
          className="w-5 h-4 flex items-center justify-center"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <FunnelIcon className={verifyFillFilter() ? "fill-white" : ""} />
        </button>
      }
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

      <div className="w-full flex justify-center gap-4 mt-4">
        <Button
          iconButton="rounded"
          colorStyle="mono"
          variant="outlined"
          onClick={() => {
            column.setFilterValue(undefined);
            setIsOpen(false);
          }}
          endIcon={<TrashIcon />}
        />

        <Button
          iconButton="rounded"
          variant="outlined"
          colorStyle="mono"
          onClick={() => {
            column.setFilterValue(optionsChecked);
            setIsOpen(false);
          }}
          endIcon={<SaveIcon />}
        />
      </div>
    </Popover>
  );
}
