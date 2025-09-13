import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Section } from "~/components";
import { useLoaderAndConfig, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TVehicle } from "~/types";
import { makeData, mask } from "~/utils";

const DATA = makeData.vehicles(50);

export function FooterPage() {
  const { translate, currentLanguage } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState("");
  useLoaderAndConfig({
    from: "/traditional-pattern/footer",
  });

  const columns = useMemo<ColumnDef<TVehicle>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        enableResizing: false,
      },
      {
        accessorKey: "label",
        header: translate("NAME"),
        minSize: 100,
        size: 100,

        enableSorting: true,
        footer: translate("TOTALS"),
        meta: {
          align: "center",
        },
      },
      {
        accessorFn: ({ price }) => mask.currency(price, currentLanguage),
        accessorKey: "price",
        header: translate("PRICE"),
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        footer: ({ table }) => {
          const myRows = table.getRowModel().rows.map((item) => item.original);
          const result = myRows.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price,
            0
          );
          return mask.currency(result, currentLanguage);
        },
      },
    ],
    [translate, currentLanguage]
  );

  return (
    <Section title={translate("FOOTER")} variant="h1">
      {translate("IMPLEMENTS_FOOTER_MODE")}

      <Table
        columns={columns}
        data={DATA}
        globalFilter={{
          filter: globalFilter,
          setFilter: setGlobalFilter,
        }}
        showFooter
      />
    </Section>
  );
}
