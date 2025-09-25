import { Header, Table } from "@tanstack/react-table";
import { managerClassNames } from "~/packages/TableMega/utils/managerClassNames";
import { ResizingElement } from "../ResizingElement";
import { ThContent } from "../ThContent";

type TThWithoutSortProps<T> = {
  table: Table<T>;
  header: Header<T, unknown>;
};

export function ThWithoutSort<T>({ header, table }: TThWithoutSortProps<T>) {
  return (
    <th
      className={managerClassNames([
        "p-4 relative ",
        {
          "text-left": !header.getContext().column.columnDef.meta?.align,
          "text-center":
            header.getContext().column.columnDef.meta?.align === "center",
          "text-right":
            header.getContext().column.columnDef.meta?.align === "right",
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
          <ThContent table={table} header={header} />
          <ResizingElement header={header} />
        </>
      )}
    </th>
  );
}
