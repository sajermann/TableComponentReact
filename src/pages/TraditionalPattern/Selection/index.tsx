import type { Table as ITable } from "@tanstack/react-table";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { RadioGroup, Section } from "~/components";
import { SelectionConfigSelector } from "~/components/SelectionConfigSelector";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

import { SelectionType } from "~/components/SelectionType";
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

export function SelectionPage() {
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
              <SelectionType
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
            <SelectionType
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
          className="flex flex-col gap-2"
        >
          <SelectionConfigSelector
            config={config}
            setConfig={setConfig}
            setSelectedItems={setSelectedItems}
          />
          <Table
            columns={[...columnsInternal, ...columns]}
            data={DATA}
            selection={{
              rowSelection: selectedItems,
              setRowSelection: setSelectedItems,
              type: config.mode,
            }}
            globalFilter={{
              showInput: true,
            }}
          />
        </RadioGroup>
        {translate("SELECTED_ROWS")}: {JSON.stringify(selectedItems, null, 2)}
      </div>
    </Section>
  );
}
