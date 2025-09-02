import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { Automatic, Disabled, Manual } from "./components";

const data = makeData.person(5);

export function TableMegaSortPage() {
  const { columns } = useColumns();
  const { translate } = useTranslation();
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
      title="Table Mega - Sort"
      variant="h1"
      className="flex flex-col gap-10"
    >
      <Automatic data={data} columns={[...columns, ...columns2]} />
      <Manual data={data} columns={[...columns, ...columns2]} />
      <Disabled data={data} columns={[...columns, ...columns2]} />
    </Section>
  );
}
