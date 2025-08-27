import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";

type TDisabledProps = {
  columns: ColumnDef<TPerson>[];
  data: TPerson[];
};
export function Disabled({ columns, data }: TDisabledProps) {
  const { translate } = useTranslation();

  return (
    <Section title={translate("DISABLED_SORT")} variant="h2">
      <Table
        columns={columns}
        data={[data[0], data[1]]}
        sorting={{
          disabled: true,
        }}
      />
    </Section>
  );
}
