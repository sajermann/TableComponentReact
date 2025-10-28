import { ContainerInput, Label, RadioGroup, Section } from "~/components";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";

import { SelectionConfigSelector } from "~/components/SelectionConfigSelector";
import { useSelection } from "./hooks";

const DATA = makeData.person(10);

export function TableMegaSelectionPage() {
  const { translate } = useTranslation();
  const { columns, setSelectedItems, selectedItems, config, setConfig } =
    useSelection();
  return (
    <Section title={translate("SELECTION")} variant="h1">
      {translate("IMPLEMENTS_SELECTION_MODE")}
      <div className="flex flex-col gap-2">
        <TableMega.Root
          data={DATA}
          columns={columns}
          selection={{
            rowSelection: selectedItems,
            setRowSelection: setSelectedItems,
            type: config.mode,
          }}
        >
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
            <SelectionConfigSelector
              config={config}
              setConfig={setConfig}
              setSelectedItems={setSelectedItems}
            >
              <ContainerInput className="col-span-12 md:col-span-6 lg:col-span-4">
                <Label htmlFor="search">{translate("SEARCH")}</Label>
                <TableMega.Search.Input id="search" />
              </ContainerInput>
            </SelectionConfigSelector>

            <TableMega.Table>
              <TableMega.Thead />
              <TableMega.Tbody>
                <TableMega.Rows />
              </TableMega.Tbody>
            </TableMega.Table>
          </RadioGroup>
        </TableMega.Root>
        {translate("SELECTED_ROWS")}: {JSON.stringify(selectedItems, null, 2)}
      </div>
    </Section>
  );
}
