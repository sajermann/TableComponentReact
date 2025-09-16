import { useState } from "react";
import { Section } from "~/components/Section";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { makeData } from "~/utils";
import { ColumnOrderSelector } from "./components/ColumnOrderSelector";

const DATA = makeData.person(50);

export function ColumnOrderPage() {
  const { translate } = useTranslation();
  const [columnOrder, setColumnOrder] = useState([
    { id: "avatar", content: "Avatar" },
    { id: "id", content: "Id" },
    { id: "name", content: translate("NAME") },
    { id: "lastName", content: translate("LAST_NAME") },
    { id: "birthday", content: translate("BIRTHDAY") },
    { id: "email", content: "Email" },
    { id: "role", content: "Role" },
    { id: "isActive", content: translate("ACTIVE") },
  ]);

  const { columns } = useColumns();

  return (
    <Section title={translate("COLUMNS_ORDER")} variant="h2">
      {translate("IMPLEMENTS_COLUMNS_ORDER_MODE")}
      <div>{translate("COLUMN_ORDER_WITH_STATE_FULLY_CONTROLLED")}</div>

      <ColumnOrderSelector items={columnOrder} onChange={setColumnOrder} />

      <Table
        columns={columns}
        data={DATA}
        columnOrder={columnOrder.map((item) => item.id)}
        maxHeight="70vh"
      />
    </Section>
  );
}
