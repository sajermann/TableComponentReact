import { useEffect, useState } from "react";
import { Section } from "~/components/Section";
import { useColumns, usePagesConfig, useTranslation } from "~/hooks";
import { TPerson } from "~/types";

import { useChildMatches, useLoaderData } from "@tanstack/react-router";
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

  const loaderData = useLoaderData({
    from: "/traditional-pattern/column-order",
  });

  usePagesConfig({
    breadcrumbs: loaderData?.breadcrumbs || [],
    pageTitle: loaderData?.pageTitle,
  });

  return (
    <Section title={translate("COLUMNS_ORDER")} variant="h2">
      {translate("IMPLEMENTS_COLUMNS_ORDER_MODE")}

      <div>{translate("COLUMN_ORDER_WITH_STATE_FULLY_CONTROLLED")}</div>

      <div className="flex flex-col justify-center items-center">
        <ColumnOrderSelector items={columnOrder} onChange={setColumnOrder} />
      </div>
      <Table
        columns={columns}
        data={DATA}
        columnOrder={columnOrder.map((item) => item.id)}
        maxHeight="70vh"
      />
    </Section>
  );
}
