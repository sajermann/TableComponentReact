import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Section } from "~/components";
import { ColumnOrderSelector } from "~/components/ColumnOrderSelector";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { useColumnOrder } from "./hooks";

const DATA = makeData.person(10);

export function TableMegaColumnOrderPage() {
  const { translate } = useTranslation();
  const { columnOrder, columns } = useColumnOrder();

  return (
    <Section title={translate("COLUMNS_ORDER")} variant="h1">
      {translate("IMPLEMENTS_COLUMNS_ORDER_MODE")}

      <div>{translate("COLUMN_ORDER_WITH_STATE_FULLY_CONTROLLED")}</div>

      <TableMega.Root
        data={DATA}
        columns={columns}
        columnOrder={columnOrder.map((item) => item.id)}
      >
        <TableMega.Table>
          <TableMega.Thead />
          <TableMega.Tbody>
            <TableMega.Rows />
          </TableMega.Tbody>
        </TableMega.Table>
      </TableMega.Root>
    </Section>
  );
}
