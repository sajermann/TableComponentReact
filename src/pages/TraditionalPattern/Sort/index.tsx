import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { Automatic, Disabled, Manual } from "./components";

const DATA = makeData.person(10);

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
    <Section title={translate("SORT")} variant="h1">
      {translate("IMPLEMENTS_SORT_MODE")}
      <div className="flex flex-col gap-10">
        <Automatic data={DATA} columns={[...columns, ...columns2]} />
        <Manual data={DATA} columns={[...columns, ...columns2]} />
        <Disabled data={DATA} columns={[...columns, ...columns2]} />
      </div>
    </Section>
  );
}
