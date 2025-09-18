import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { Selector } from "./components/Selector";

const DATA = makeData.person(10);

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
          <Selector
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
          <Selector
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
          <Selector
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
          <Selector
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
          <Selector
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
          <Selector
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
          <Selector
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
          <Selector
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
    <Section title={translate("COLUMNS_ORDER")} variant="h1">
      {translate("IMPLEMENTS_COLUMNS_ORDER_MODE")}

      <div>{translate("COLUMN_ORDER_WITH_STATE_FULLY_CONTROLLED")}</div>

      <TableMega.Root
        data={DATA}
        columns={columns2}
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
