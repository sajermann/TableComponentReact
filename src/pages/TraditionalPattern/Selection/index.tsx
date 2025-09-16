import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { ContainerInput, Input, Label, Section } from "~/components";
import Select from "~/components/Select";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

const DATA = makeData.person(50);

type TOptions<T> = {
  value: T;
  label: string;
};

export function SelectionPage() {
  const { translate } = useTranslation();

  const [selectedItems, setSelectedItems] = useState({});
  const [selectionType, setSelectionType] = useState("single");
  const [singleRadio, setSingleRadio] = useState(false);
  const [disableSelectionForId, setDisableSelectionForId] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const { columns } = useColumns();

  function verifyForDisable(row: Row<TPerson>) {
    if (Number(row.original.id) > Number(disableSelectionForId)) {
      return true;
    }
    return false;
  }

  const OPTIONS_LIST: TOptions<"single" | "multi">[] = [
    { value: "multi", label: translate("MULTI") },
    { value: "single", label: translate("SINGLE") },
  ];

  const OPTIONS_LIST_RADIO: TOptions<"true" | "false">[] = [
    { value: "true", label: translate("YES") },
    { value: "false", label: translate("NO") },
  ];

  return (
    <Section title={translate("SELECTION")} variant="h1">
      {translate("IMPLEMENTS_SELECTION_MODE")}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-12 gap-2">
          <ContainerInput className="col-span-12 md:col-span-4 lg:col-span-4">
            <Label className="whitespace-nowrap" htmlFor="selection_type">
              {translate("SELECTION_TYPE")}
            </Label>
            <Select.Container>
              <Select.Select
                id="selection_type"
                onChange={({ target }) => {
                  setSelectionType(target?.value);
                  setSelectedItems({});
                  if (target?.value === "multi") {
                    setSingleRadio(false);
                  }
                }}
                value={
                  OPTIONS_LIST.find((item) => item.value === selectionType)
                    ?.value
                }
              >
                {OPTIONS_LIST.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select.Select>
              <Select.Arrow />
            </Select.Container>
          </ContainerInput>

          <ContainerInput className="col-span-12 md:col-span-3 lg:col-span-4">
            <Label className="whitespace-nowrap" htmlFor="radio_type">
              {translate("RADIO_TYPE")}
            </Label>
            <Select.Container>
              <Select.Select
                onChange={({ target }) => {
                  setSingleRadio(target?.value === "true");
                  if (target?.value === "true") {
                    setSelectionType("single");
                  }
                }}
                value={String(
                  OPTIONS_LIST_RADIO.find((item) => {
                    const converted = item.value === "true";
                    return converted === singleRadio;
                  })?.value
                )}
              >
                {OPTIONS_LIST_RADIO.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select.Select>
              <Select.Arrow />
            </Select.Container>
          </ContainerInput>

          <ContainerInput className="col-span-12 md:col-span-5 lg:col-span-4">
            <Label htmlFor="disableSelection">
              {translate("DISABLE_SELECTION_WHEN_ID_GREATER_THAN")}
            </Label>
            <Input
              placeholder="Id"
              id="disableSelection"
              className="flex-1"
              value={disableSelectionForId}
              onChange={(e) => setDisableSelectionForId(e.target.value)}
            />
          </ContainerInput>
        </div>
        <Table
          columns={columns}
          data={DATA}
          selection={{
            rowSelection: selectedItems,
            setRowSelection: setSelectedItems,
            type: selectionType === "single" ? selectionType : "multi",
            disableSelectionRow:
              disableSelectionForId !== "" ? verifyForDisable : undefined,
            singleRadio: singleRadio ? true : undefined,
          }}
          globalFilter={{
            filter: globalFilter,
            setFilter: setGlobalFilter,
          }}
        />
        {translate("SELECTED_ROWS")}: {JSON.stringify(selectedItems, null, 2)}
      </div>
    </Section>
  );
}
