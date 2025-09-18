import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";

const DATA = makeData.person(10);

export function TableMegaDefaultPage() {
  const { translate } = useTranslation();
  const { columns } = useColumns();

  return (
    <Section title={translate("DEFAULT")} variant="h1">
      <TableMega.Root data={DATA} columns={columns}>
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
