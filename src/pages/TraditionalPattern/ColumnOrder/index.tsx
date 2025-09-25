import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ColumnOrderSelector } from "~/components/ColumnOrderSelector";
import { Section } from "~/components/Section";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

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

  function handleChangeOrder({
    currentId,
    targetId,
  }: {
    currentId: string;
    targetId?: string;
  }) {
    const currentIndex = columnOrder.findIndex((item) => item.id === currentId);
    const targetIndex = columnOrder.findIndex((item) => item.id === targetId);

    const newOrder = [...columnOrder];
    [newOrder[currentIndex], newOrder[targetIndex]] = [
      newOrder[targetIndex],
      newOrder[currentIndex],
    ];

    setColumnOrder(newOrder.map((item) => ({ ...item })));
  }

  const { columns } = useColumns();

  const columns2 = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        ...columns[0],
        header: ({ header }) => (
          <ColumnOrderSelector
            value={columnOrder[header.index].content}
            optionsList={columnOrder}
            onChange={(value) => {
              handleChangeOrder({
                currentId: columnOrder[header.index].id,
                targetId: columnOrder.find((i) => i.content === value)?.id,
              });
            }}
          />
        ),
      } as ColumnDef<TPerson>,
      {
        ...columns[1],
        header: ({ header }) => (
          <ColumnOrderSelector
            value={columnOrder[header.index].content}
            optionsList={columnOrder}
            onChange={(value) => {
              handleChangeOrder({
                currentId: columnOrder[header.index].id,
                targetId: columnOrder.find((i) => i.content === value)?.id,
              });
            }}
          />
        ),
      } as ColumnDef<TPerson>,
      {
        ...columns[2],
        header: ({ header }) => (
          <ColumnOrderSelector
            value={columnOrder[header.index].content}
            optionsList={columnOrder}
            onChange={(value) => {
              handleChangeOrder({
                currentId: columnOrder[header.index].id,
                targetId: columnOrder.find((i) => i.content === value)?.id,
              });
            }}
          />
        ),
      } as ColumnDef<TPerson>,
      {
        ...columns[3],
        header: ({ header }) => (
          <ColumnOrderSelector
            value={columnOrder[header.index].content}
            optionsList={columnOrder}
            onChange={(value) => {
              handleChangeOrder({
                currentId: columnOrder[header.index].id,
                targetId: columnOrder.find((i) => i.content === value)?.id,
              });
            }}
          />
        ),
      } as ColumnDef<TPerson>,
      {
        ...columns[4],
        header: ({ header }) => (
          <ColumnOrderSelector
            value={columnOrder[header.index].content}
            optionsList={columnOrder}
            onChange={(value) => {
              handleChangeOrder({
                currentId: columnOrder[header.index].id,
                targetId: columnOrder.find((i) => i.content === value)?.id,
              });
            }}
          />
        ),
      } as ColumnDef<TPerson>,
      {
        ...columns[5],
        header: ({ header }) => (
          <ColumnOrderSelector
            value={columnOrder[header.index].content}
            optionsList={columnOrder}
            onChange={(value) => {
              handleChangeOrder({
                currentId: columnOrder[header.index].id,
                targetId: columnOrder.find((i) => i.content === value)?.id,
              });
            }}
          />
        ),
      } as ColumnDef<TPerson>,
      {
        ...columns[6],
        header: ({ header }) => (
          <ColumnOrderSelector
            value={columnOrder[header.index].content}
            optionsList={columnOrder}
            onChange={(value) => {
              handleChangeOrder({
                currentId: columnOrder[header.index].id,
                targetId: columnOrder.find((i) => i.content === value)?.id,
              });
            }}
          />
        ),
      } as ColumnDef<TPerson>,
      {
        ...columns[7],
        header: ({ header }) => (
          <ColumnOrderSelector
            value={columnOrder[header.index].content}
            optionsList={columnOrder}
            onChange={(value) => {
              handleChangeOrder({
                currentId: columnOrder[header.index].id,
                targetId: columnOrder.find((i) => i.content === value)?.id,
              });
            }}
          />
        ),
      } as ColumnDef<TPerson>,
    ],
    [translate, columnOrder]
  );

  return (
    <Section title={translate("COLUMNS_ORDER")} variant="h2">
      {translate("IMPLEMENTS_COLUMNS_ORDER_MODE")}
      <div>{translate("COLUMN_ORDER_WITH_STATE_FULLY_CONTROLLED")}</div>

      <Table
        columns={columns2}
        data={DATA}
        columnOrder={columnOrder.map((item) => item.id)}
        maxHeight="70vh"
      />
    </Section>
  );
}
