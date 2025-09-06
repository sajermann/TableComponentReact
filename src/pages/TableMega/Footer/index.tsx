import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Section } from "~/components";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TVehicle } from "~/types";
import { makeData, mask } from "~/utils";

const DATA = makeData.vehicles(50);

export function TableMegaFooterPage() {
  const { translate, currentLanguage } = useTranslation();

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

      <TableMega.Root data={DATA} columns={columns}>
        <TableMega.Search.Input />
        <TableMega.Table>
          <TableMega.Thead.Sort />
          <TableMega.Tbody>
            <TableMega.Rows />
          </TableMega.Tbody>
          <TableMega.Tfoot />
        </TableMega.Table>
      </TableMega.Root>
    </Section>
  );
}
