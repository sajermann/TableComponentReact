import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ColumnOrderSelector } from "~/components/ColumnOrderSelector";
import { useColumns, useTranslation } from "~/hooks";
import { TPerson } from "~/types";
import { handleChangeOrder } from "../utils";

export function useColumnOrder() {
  const { columns } = useColumns();
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
                columnOrder,
                setColumnOrder,
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
                columnOrder,
                setColumnOrder,
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
                columnOrder,
                setColumnOrder,
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
                columnOrder,
                setColumnOrder,
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
                columnOrder,
                setColumnOrder,
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
                columnOrder,
                setColumnOrder,
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
                columnOrder,
                setColumnOrder,
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
                columnOrder,
                setColumnOrder,
              });
            }}
          />
        ),
      } as ColumnDef<TPerson>,
    ],
    [translate, columnOrder]
  );
  return {
    columnOrder,
    columns: columns2,
  };
}
