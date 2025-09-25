import { useTableMega } from "~/packages/TableMega/hooks";
import { ThWithSort } from "../ThWithSort";

export function RowsWithSort() {
  const { table } = useTableMega();
  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <ThWithSort key={header.id} header={header} table={table} />
          ))}
        </tr>
      ))}
    </>
  );
}
