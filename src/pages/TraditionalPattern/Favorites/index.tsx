import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Icons, Section } from "~/components";
import { Main } from "~/components/RoutesConfig/Sidebar/Main";
import { useColumns, useLoaderAndConfig, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

const DATA = makeData.person(3);

export function FavoritesPage() {
  const { translate } = useTranslation();
  const [selectedItems, setSelectedItems] = useState({});
  const { columns } = useColumns();

  const columnsInternal = useMemo<ColumnDef<TPerson>[]>(
    () => [
      columns[0],
      columns[1],
      columns[2],
      columns[3],
      {
        id: "select",
        header: translate("FAVORITES"),
        size: 60,
        minSize: 60,
        maxSize: 60,
        meta: {
          align: "center",
        },
        enableSorting: false,
        cell: ({ row }: CellContext<TPerson, unknown>) => (
          <div className="w-full h-6 flex items-center justify-center hover:cursor-pointer">
            {row.getIsSelected() ? (
              <Icons nameIcon="star" fill="#0054B6" stroke="#0054B6" />
            ) : (
              <Icons nameIcon="star" stroke="#0054B6" />
            )}
          </div>
        ),
      },
    ],
    [translate]
  );

  useLoaderAndConfig({
    from: "/traditional-pattern/favorites",
  });

  return (
    <Section title={translate("FAVORITES")} variant="h1">
      {translate("IMPLEMENTS_FAVORITES_MODE")}
      <Table
        columns={columnsInternal}
        data={DATA}
        selection={{
          rowSelection: selectedItems,
          setRowSelection: setSelectedItems,
          type: "multi",
          disableCheckbox: true,
        }}
      />
      {translate("FAVORITE_ROWS")}: {JSON.stringify(selectedItems, null, 2)}
    </Section>
  );
}
