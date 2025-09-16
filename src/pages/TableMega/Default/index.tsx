import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";

const data = makeData.person(10);

export function TableMegaDefaultPage() {
  const { translate } = useTranslation();
  const { columns } = useColumns();

  return (
    <Section title={translate("Default")} variant="h1">
      <TableMega.Root data={data} columns={columns}>
        <TableMega.Table>
          <TableMega.Thead />
          <TableMega.Tbody>
            <TableMega.Rows />
          </TableMega.Tbody>
        </TableMega.Table>
      </TableMega.Root>
    </Section>
  );
}
