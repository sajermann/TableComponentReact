import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
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
      <Table
        columns={columns}
        data={[data[0], data[1]]}
        sorting={{
          manualSorting: {
            fn: setSortingInternal,
          },
        }}
      />
    </Section>
  );
}
