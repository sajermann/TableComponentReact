import { Section } from "~/components";
import { useColumns } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";

const data = makeData.person(10);

export function TableMegaDefaultPage() {
  const { columns } = useColumns();

  return (
    <Section title="Table Mega - Default" variant="h1">
      <TableMega.Root data={data} columns={columns}>
        <TableMega.Table>
          <TableMega.Thead.Default />
          <TableMega.Tbody>
            <TableMega.Rows />
          </TableMega.Tbody>
        </TableMega.Table>
      </TableMega.Root>
    </Section>
  );
}
