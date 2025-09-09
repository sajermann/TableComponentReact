import type { Table as ITable } from "@tanstack/react-table";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { RadioGroup, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { ConfigSelector } from "./components/ConfigSelector";
import { Selector } from "./components/Selector";
import { TConfig, TSelectionRow } from "./types";

const DATA = makeData.person(10);

function verifyIndeterminate<T>(table: ITable<T>) {
  if (table.getIsAllRowsSelected()) {
    return true;
  }

  if (table.getIsSomeRowsSelected()) {
    return "indeterminate";
  }

  return false;
}

export function TableMegaSelectionPage() {
  const { translate } = useTranslation();
  const [config, setConfig] = useState<TConfig>({
    mode: "single",
    componentType: "checkbox",
    disableByIdGreaterThan: null,
  });
  const [selectedItems, setSelectedItems] = useState<TSelectionRow>({});
  const { columns } = useColumns();

  const columnsInternal = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        id: "selection",
        header: ({ table }: HeaderContext<TPerson, unknown>) =>
          config.mode === "multi" && (
            <>
              <Selector
                componentType={config.componentType}
                onChange={() => {
                  table.getToggleAllRowsSelectedHandler()({ target: {} });
                }}
                isActivated={verifyIndeterminate(table)}
                disabled={typeof config.disableByIdGreaterThan === "number"}
              />
            </>
          ),
        size: 70,
        minSize: 70,
        maxSize: 70,
        meta: {
          align: "center",
        },
        enableSorting: false,
        enableResizing: false,
        cell: ({ row }) => {
          return (
            <Selector
              rowIndex={row.index}
              componentType={config.componentType}
              onChange={() => {
                row.toggleSelected();
              }}
              isActivated={row.getIsSelected()}
              disabled={
                typeof config.disableByIdGreaterThan === "number" &&
                Number(row.getValue("id")) > config.disableByIdGreaterThan
              }
            />
          );
        },
      },
    ],
    [columns, translate, config, selectedItems]
  );

  return (
    <Section title={translate("SELECTION")} variant="h1">
      {translate("IMPLEMENTS_SELECTION_MODE")}
      <div className="flex flex-col gap-2">
        <RadioGroup
          onValueChange={(e) => {
            setSelectedItems({
              [e]: true,
            });
          }}
          value={
            Object.keys(selectedItems).length
              ? Object.keys(selectedItems)[0]
              : ""
          }
        >
          <TableMega.Root
            data={DATA}
            columns={[...columnsInternal, ...columns]}
            selection={{
              rowSelection: selectedItems,
              setRowSelection: setSelectedItems,
              type: config.mode,
            }}
          >
            <ConfigSelector
              config={config}
              setConfig={setConfig}
              setSelectedItems={setSelectedItems}
            />

            <TableMega.Table>
              <TableMega.Thead />
              <TableMega.Tbody>
                <TableMega.Rows />
              </TableMega.Tbody>
            </TableMega.Table>
          </TableMega.Root>
        </RadioGroup>
        {translate("SELECTED_ROWS")}: {JSON.stringify(selectedItems, null, 2)}
      </div>
    </Section>
  );
}
