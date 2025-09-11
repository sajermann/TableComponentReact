import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { Automatic, Disabled, Manual } from "./components";

const data = makeData.person(10);

export function SortPage() {
  const { translate } = useTranslation();

  const { columns } = useColumns();

  const columns2 = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: "friends",
        accessorFn: (e) => e.friends.map((item) => item.name).join(" | "),
        header: translate("FRIENDS"),
        minSize: 100,
        size: 200,
        cell: (info) => info.getValue(),
      },
    ],
    [translate]
  );

  return (
    <Section
      title={translate("SORT")}
      variant="h1"
      className="flex flex-col gap-10"
    >
      {translate("IMPLEMENTS_SORT_MODE")}
      <Automatic data={data} columns={[...columns, ...columns2]} />
      <Manual data={data} columns={[...columns, ...columns2]} />
      <Disabled data={data} columns={[...columns, ...columns2]} />
    </Section>
  );
}
