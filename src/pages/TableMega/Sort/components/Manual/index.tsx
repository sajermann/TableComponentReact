import { ColumnDef, SortingState } from "@tanstack/react-table";
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
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Section title={translate("MANUAL_SORT")} variant="h2">
      {translate("THIS_IS_USEFUL_IF_YOU_ARE_DOING_SERVER_SIDE_SORTING")}
      <p>State: {JSON.stringify(sorting)}</p>
      <TableMega.Root data={data} columns={columns}>
        <TableMega.Table>
          <TableMega.Thead.Sort
            controlled={{ sort: sorting, setSort: setSorting }}
          />
          <TableMega.Tbody>
            <TableMega.Rows />
          </TableMega.Tbody>
        </TableMega.Table>
      </TableMega.Root>
    </Section>
  );
}
