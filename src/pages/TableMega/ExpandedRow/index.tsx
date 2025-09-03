import { ColumnDef } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { UpdateData } from "./components/UpdateData";
import { UpdateRowExpanded } from "./components/UpdateRowExpanded";

export function TableMegaExpandedRowPage() {
  const { translate } = useTranslation();
  const { columns } = useColumns();
  const [data, setData] = useState<TPerson[]>(makeData.person(5));

  const columnExpand = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: "id_action",
        header: translate("ACTIONS"),
        minSize: 100,
        size: 100,
        cell: ({ row }) => (
          <div className="flex w-full justify-center">
            <Button
              iconButton="squared"
              colorStyle="mono"
              variant="outlined"
              endIcon={
                row.getIsExpanded() ? <ChevronUpIcon /> : <ChevronDownIcon />
              }
              onClick={row.getToggleExpandedHandler()}
            />
          </div>
        ),
        meta: {
          align: "center",
        },
      },
    ],
    [translate]
  );

  return (
    <Section title={translate("EXPAND_ROW")} variant="h2">
      {translate("IMPLEMENTS_EXPAND_ROW_MODE")}

      <TableMega.Root data={data} columns={[...columnExpand, ...columns]}>
        <TableMega.Table>
          <TableMega.Thead />
          <TableMega.Tbody>
            <TableMega.Rows.Default.Expand
              parentTrProps={{ className: "border border-b-0" }}
              expandedTrProps={{ className: "border border-t-0" }}
            />
          </TableMega.Tbody>
        </TableMega.Table>
        <TableMega.OnExpanded>
          <UpdateData
            onCancel={({ row }) => row?.getToggleExpandedHandler()()}
            onSave={({ row, dataToUpdate }) => {
              if (!row) {
                return;
              }
              const index = row.index;
              const updateData = [...data];
              updateData[index] = { ...updateData[index], ...dataToUpdate };
              setData([...updateData]);
              row.getToggleExpandedHandler()();
            }}
          />
        </TableMega.OnExpanded>
      </TableMega.Root>
    </Section>
  );
}
