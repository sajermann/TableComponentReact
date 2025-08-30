import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Section } from "~/components";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";

type TAutomaticProps = {
  columns: ColumnDef<TPerson>[];
  data: TPerson[];
};
export function Manual({ columns, data }: TAutomaticProps) {
  const { translate } = useTranslation();
  const [sortingInternal, setSortingInternal] = useState<
    Record<string, unknown>[]
  >([]);

  return (
    <Section title={translate("MANUAL_SORT")} variant="h2">
      {translate("THIS_IS_USEFUL_IF_YOU_ARE_DOING_SERVER_SIDE_SORTING")}
      <p>State: {JSON.stringify(sortingInternal)}</p>
      <TableMega.Root data={data} columns={columns}>
        <TableMega.Table>
          <TableMega.Thead.Sort
            controlled={{ sort: sortingInternal, setSort: setSortingInternal }}
          />
          <TableMega.Tbody>
            <TableMega.Rows />
          </TableMega.Tbody>
        </TableMega.Table>
      </TableMega.Root>

      {/* sorting={{
          manualSorting: {
            fn: setSortingInternal,
          },
        }} */}
    </Section>
  );
}
