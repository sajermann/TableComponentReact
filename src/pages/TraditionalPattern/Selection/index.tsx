import { RadioGroup, Section } from "~/components";
import { SelectionConfigSelector } from "~/components/SelectionConfigSelector";
import { useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { makeData } from "~/utils";
import { useSelection } from "./hooks";

const DATA = makeData.person(10);

export function SelectionPage() {
  const { translate } = useTranslation();
  const { columns, setSelectedItems, selectedItems, config, setConfig } =
    useSelection();
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
            columns={columns}
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
