import { Header, flexRender } from "@tanstack/react-table";
import { managerClassNames } from "~/packages/TableMega/utils/managerClassNames";

export function ThWithoutSort<T>({ header }: { header: Header<T, unknown> }) {
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
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  );
}
