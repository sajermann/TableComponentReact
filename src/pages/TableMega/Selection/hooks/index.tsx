import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { SelectionType } from "~/components/SelectionType";
import { useColumns, useTranslation } from "~/hooks";
import { TPerson } from "~/types";
import { TConfig, TSelectionRow } from "../types";
import { verifyIndeterminate } from "../utils";

export function useSelection() {
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
          console.log({ row });
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

  return {
    columns: [...columnsInternal, ...columns],
    selectedItems,
    setSelectedItems,
    config,
    setConfig,
  };
}
