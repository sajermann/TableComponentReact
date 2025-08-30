import { ColumnDef } from "@tanstack/react-table";
import { Section } from "~/components";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";

type TDisabledProps = {
  columns: ColumnDef<TPerson>[];
  data: TPerson[];
};
export function Disabled({ columns, data }: TDisabledProps) {
  const { translate } = useTranslation();

  return (
    <Section title={translate("DISABLED_SORT")} variant="h2">
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
