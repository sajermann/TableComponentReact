import { useTableMega } from "~/packages/TableMega/hooks";
import { ThWithoutSort } from "../ThWithoutSort";

export function RowsWithoutSort() {
  const { table } = useTableMega();
  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <ThWithoutSort key={header.id} header={header} />
          ))}
        </tr>
      ))}
    </>
  );
}
