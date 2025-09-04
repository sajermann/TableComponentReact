import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";

const DATA = makeData.person(5);

export function Simple() {
  const { translate } = useTranslation();
  const { columns } = useColumns();

  return (
    <Section title={translate("SIMPLE")} variant="h2">
      <TableMega.Root data={DATA} columns={columns}>
        <TableMega.Search.Input />
        <TableMega.Table>
          <TableMega.Thead.Sort />
          <TableMega.Tbody>
            <TableMega.Rows />
          </TableMega.Tbody>
        </TableMega.Table>
      </TableMega.Root>
    </Section>
  );
}
