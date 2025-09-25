import { ColumnDef } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Button, Section } from "~/components";
import { ExpandRowUpdateData } from "~/components/ExpandRowUpdateData";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

export function TraditionalExpandRowPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>(makeData.person(5));
  const { columns } = useColumns();

  const columnExpand = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: "id_action",
        header: translate("ACTIONS"),
        minSize: 70,
        size: 70,
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

      <Table
        columns={[...columnExpand, ...columns]}
        data={data}
        expandRow={{
          parentTrProps: { className: "border border-b-0 !bg-red-500" },
          expandedTrProps: { className: "border border-t-0 !bg-red-500" },
          render: (row) => (
            <ExpandRowUpdateData
              row={row}
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
          ),
        }}
      />
    </Section>
  );
}
