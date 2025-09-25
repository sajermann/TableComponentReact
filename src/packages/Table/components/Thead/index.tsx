import { Table } from "@tanstack/react-table";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";
import { Resizing } from "./Resizing";
import { ThContent } from "./ThContent";

type TTheadProps<T> = {
  table: Table<T>;
  sorting?: {
    disabled?: boolean;
  };
};

export function Thead<T>({ table, sorting }: TTheadProps<T>) {
  return (
    <thead
      className={managerClassNames({
        "m-0 top-0 sticky z-[1] backdrop-blur-md h-14": true,
        "shadow-lg shadow-black/25 dark:shadow-white/25": true,
      })}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              className={managerClassNames([
                "p-4 relative",
                {
                  "text-left":
                    !header.getContext().column.columnDef.meta?.align,
                  "text-center":
                    header.getContext().column.columnDef.meta?.align ===
                    "center",
                  "text-right":
                    header.getContext().column.columnDef.meta?.align ===
                    "right",
                },
              ])}
              key={header.id}
              colSpan={header.colSpan}
              style={{
                width: header.getSize(),
              }}
            >
              {header.isPlaceholder ? null : (
                <>
                  <ThContent table={table} header={header} sorting={sorting} />
                  <Resizing header={header} />
                </>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
