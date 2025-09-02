import { useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";
import { ColumnOrderSelector } from "./components/ColumnOrderSelector";

const data = makeData.person(10);

export function TableMegaColumnOrderPage() {
  const { translate } = useTranslation();
  const [columnOrder, setColumnOrder] = useState([
    { id: "id", content: "Id" },
    { id: "avatar", content: "Avatar" },
    { id: "name", content: translate("NAME") },
    { id: "lastName", content: translate("LAST_NAME") },
    { id: "birthday", content: translate("BIRTHDAY") },
    { id: "email", content: "Email" },
    { id: "role", content: "Role" },
    { id: "isActive", content: translate("ACTIVE") },
  ]);

  const { columns } = useColumns();

  return (
    <Section title={translate("COLUMNS_ORDER")} variant="h1">
      {translate("IMPLEMENTS_COLUMNS_ORDER_MODE")}

      <div>{translate("COLUMN_ORDER_WITH_STATE_FULLY_CONTROLLED")}</div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-center items-center">
          <ColumnOrderSelector items={columnOrder} onChange={setColumnOrder} />
        </div>
        <TableMega.Root
          data={data}
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
      </div>
    </Section>
  );
}
