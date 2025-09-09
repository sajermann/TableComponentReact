import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { Resizing } from "./components/Resizing";

const DATA = makeData.person(5);

const IDENTIFIER = `${import.meta.env.VITE_APPLICATION_IDENTIFIER}:resizing`;

const DEFAULT = {
  id: 100,
  avatar: 60,
  name: 100,
  lastName: 100,
  birthday: 100,
  email: 100,
  role: 100,
  isActive: 100,
  friends: 100,
};

export function TableMegaResizingPage() {
  const { translate } = useTranslation();
  const [columnSize] = useState<Record<string, number>>(() => {
    const saveds = localStorage.getItem(IDENTIFIER);

    if (!saveds) {
      return DEFAULT;
    }

    return JSON.parse(saveds);
  });

  const { columns } = useColumns(columnSize);

  const columnsInternal = useMemo<ColumnDef<TPerson>[]>(
    () => [
      columns[0],
      columns[1],
      {
        ...columns[2],
        meta: {
          ...columns[2].meta,
          resizingElement: ({ table, header }) => (
            <Resizing table={table} header={header} />
          ),
        },
      },
      {
        ...columns[3],
        meta: {
          ...columns[3].meta,
          resizingElement: ({ table, header }) => (
            <Resizing table={table} header={header} />
          ),
        },
      },
      columns[4],
      {
        ...columns[5],
        meta: {
          ...columns[5].meta,
          resizingElement: ({ table, header }) => (
            <Resizing table={table} header={header} />
          ),
        },
      },
      columns[6],
      columns[7],
    ],
    [columns, translate]
  );

  return (
    <Section title={translate("RESIZING")} variant="h1">
      {translate("IMPLEMENTS_RESIZING_MODE")}
      <div className="flex flex-col gap-2">
        {translate("SAVE_COLUMN_SIZE_STATE_AFTER_ONE_SECOND_IN_LOCAL_STORAGE")}
        <div>
          <Button
            variant="outlined"
            colorStyle="mono"
            onClick={() => {
              localStorage.removeItem(IDENTIFIER);
              window.location.reload();
            }}
          >
            {translate("RESET")}
          </Button>
        </div>
        <TableMega.Root data={DATA} columns={columnsInternal}>
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
