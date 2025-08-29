import { Header, Table } from "@tanstack/react-table";

export function Filter<T>({
  header,
  table,
}: {
  header: Header<T, unknown>;
  table: Table<T>;
}) {
  if (
    header.column.getCanFilter() &&
    header.getContext().column.columnDef.meta?.filterElement
  ) {
    return (
      <div className="flex items-center justify-center">
        {header
          .getContext()
          .column.columnDef.meta?.filterElement?.(
            header.getContext().column,
            table
          )}
      </div>
    );
  }
  return null;
}
