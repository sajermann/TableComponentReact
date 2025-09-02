import { ColumnDef } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { UpdateRowExpanded } from "./components/UpdateRowExpanded";

export function TableMegaExpandedRowPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { columns } = useColumns();
  const [expandedRow, setExpandedRow] = useState<null | number>(null);

  useEffect(() => {
    setIsLoading(true);
    setData(makeData.person(20));
    setIsLoading(false);
  }, []);

  const columnExpand = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: "id_action",
        header: translate("ACTIONS"),
        minSize: 100,
        size: 100,
        cell: (info) => (
          <div className="flex w-full justify-center">
            <Button
              iconButton="squared"
              colorStyle="mono"
              variant="outlined"
              endIcon={
                expandedRow === info.row.index ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )
              }
              onClick={() => {
                setExpandedRow((prev) => {
                  if (prev === null) {
                    return info.row.index;
                  }
                  return null;
                });
                info.row.getToggleExpandedHandler()();
              }}
            />
          </div>
        ),
        meta: {
          align: "center",
        },
      },
    ],
    [translate, expandedRow]
  );

  return (
    <Section title={translate("EXPAND_ROW")} variant="h2">
      {translate("IMPLEMENTS_EXPAND_ROW_MODE")}
      {JSON.stringify({ expandedRow })}
      {/* <Table
        isLoading={isLoading}
        columns={columns}
        data={data}
        expandLine={{
          render: ({ original, getToggleExpandedHandler, index }) => (
            <UpdateRowExpanded
              dataToEdit={original}
              onSave={(dataUpdate) => {
                const updateData = [...data];
                updateData[index] = { ...updateData[index], ...dataUpdate };
                setData([...updateData]);
                getToggleExpandedHandler()();
              }}
              onCancel={getToggleExpandedHandler}
            />
          ),
        }}
      /> */}

      <TableMega.Root data={data} columns={[...columnExpand, ...columns]}>
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
