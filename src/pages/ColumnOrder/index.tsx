import { useEffect, useState } from "react";
import { Section } from "~/components/Section";
import { useColumns, useTranslation } from "~/hooks";
import { TPerson } from "~/types";

import { Table } from "~/packages/Table";
import { makeData } from "~/utils";
import { ColumnOrderSelector } from "./components/ColumnOrderSelector";

export function ColumnOrderPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>([]);
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

  useEffect(() => {
    setData(makeData.person(50));
  }, []);

  return (
    <Section title={translate("COLUMNS_ORDER")} variant="h2">
      {translate("IMPLEMENTS_COLUMNS_ORDER_MODE")}

      <div>{translate("COLUMN_ORDER_WITH_STATE_FULLY_CONTROLLED")}</div>

      <div className="flex flex-col justify-center items-center">
        <ColumnOrderSelector items={columnOrder} onChange={setColumnOrder} />
      </div>
      <Table
        columns={columns}
        data={data}
        columnOrder={columnOrder.map((item) => item.id)}
      />
    </Section>
  );
}
