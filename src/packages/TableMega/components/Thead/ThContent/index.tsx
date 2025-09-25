import { Header, Table, flexRender } from "@tanstack/react-table";
import { managerClassNames } from "../../../utils/managerClassNames";
import { SortIcon } from "../SortIcon";

export function ThContent<T>({
  header,
  withSorting,
  table,
}: {
  header: Header<T, unknown>;
  table: Table<T>;
  withSorting?: boolean;
}) {
  const hasFilterElement =
    !!header.getContext().column.columnDef.meta?.filterElement;

  if ((!header.column.getCanSort() || !withSorting) && !hasFilterElement) {
    return flexRender(header.column.columnDef.header, header.getContext());
  }

  return (
    <div
      className={managerClassNames([
        "flex items-center gap-2",
        {
          "justify-center":
            header.getContext().column.columnDef.meta?.align === "center",
          "justify-end":
            header.getContext().column.columnDef.meta?.align === "right",
        },
      ])}
    >
      {!withSorting ? (
        flexRender(header.column.columnDef.header, header.getContext())
      ) : (
        <button
          type="button"
          className={managerClassNames([
            "flex items-center gap-2",
            "hover:opacity-70 transition-opacity duration-500",
            {
              "justify-center":
                header.getContext().column.columnDef.meta?.align === "center",
              "justify-end":
                header.getContext().column.columnDef.meta?.align === "right",

              // "cursor-pointer select-none":
              //   header.column.getCanSort() && !sorting,
              // "!cursor-default outline-0 tab select-none":
              //   !header.column.getCanSort() || sorting?.disabled,
            },
          ])}
          tabIndex={header.column.getCanSort() ? undefined : -1}
          onClick={header.column.getToggleSortingHandler()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          <SortIcon header={header} />
        </button>
      )}

      {header.getContext().column.columnDef.meta?.filterElement?.({
        column: header.getContext().column,
        table,
      })}
    </div>
  );
}
