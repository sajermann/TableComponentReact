import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

const DATA = makeData.person(5);

export function EllipsisPage() {
  const { translate } = useTranslation();
  const { columns } = useColumns();
  const columns2 = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: "friends",
        accessorFn: (e) => e.friends.map((item) => item.name).join(" | "),
        header: translate("FRIENDS"),
        minSize: 50,
        size: 50,
        cell: (info) => info.getValue(),
      },
    ],
    [translate]
  );

  return (
    <Section title={translate("ELLIPSIS")} variant="h1">
      {translate("IMPLEMENTS_ELLIPSIS_MODE")}

      <div className="flex flex-col gap-2">
        {translate("DISPLAY_TITLE_ONLY_HOVER_ON_ELLIPSIS")}
        <Table columns={[...columns2, ...columns]} data={DATA} />
      </div>
    </Section>
  );
}
