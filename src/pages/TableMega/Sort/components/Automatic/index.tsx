import { ColumnDef } from "@tanstack/react-table";
import { Section } from "~/components";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";

type TAutomaticProps = {
  columns: ColumnDef<TPerson>[];
  data: TPerson[];
};
export function Automatic({ columns, data }: TAutomaticProps) {
  const { translate } = useTranslation();

  return (
    <Section title={translate("AUTOMATIC_SORT")} variant="h2">
      {translate("NOTE_FRIENDS_IS_ARRAY_OF_OBJECT")}

      <TableMega.Root data={data} columns={columns}>
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
