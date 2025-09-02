import { Header, flexRender } from "@tanstack/react-table";
import { managerClassNames } from "~/packages/TableMega/utils/managerClassNames";
import { SortIcon } from "../SortIcon";
import { ThWithoutSort } from "../ThWithoutSort";

export function ThWithSort<T>({ header }: { header: Header<T, unknown> }) {
  if (!header.column.getCanSort()) {
    return <ThWithoutSort header={header} />;
  }
  return (
    <th
      className="p-4"
      key={header.id}
      colSpan={header.colSpan}
      style={{
        width: header.getSize(),
      }}
    >
      {header.isPlaceholder ? null : (
        <button
          type="button"
          className={managerClassNames([
            "flex items-center gap-2 w-full",
            {
              "justify-center":
                header.getContext().column.columnDef.meta?.align === "center",
              "justify-right":
                header.getContext().column.columnDef.meta?.align === "right",
              "cursor-pointer select-none": header.column.getCanSort(),
            },
          ])}
          onClick={header.column.getToggleSortingHandler()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          <SortIcon header={header} />
        </button>
      )}
    </th>
  );
}
