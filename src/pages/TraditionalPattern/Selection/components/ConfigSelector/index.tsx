import { Dispatch, SetStateAction } from "react";
import { ContainerInput, Input, Label } from "~/components";
import Select from "~/components/Select";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TConfig, TOptions, TSelectionRow } from "../../types";

type TConfigSelector = {
  config: TConfig;
  setConfig: Dispatch<SetStateAction<TConfig>>;
  setSelectedItems: Dispatch<SetStateAction<TSelectionRow>>;
};

export function ConfigSelector({
  config,
  setConfig,
  setSelectedItems,
}: TConfigSelector) {
  const { translate } = useTranslation();

  const OPTIONS_LIST: TOptions<"single" | "multi">[] = [
    { value: "multi", label: translate("MULTI") },
    { value: "single", label: translate("SINGLE") },
  ];

  const COMPONENT_LIST: TOptions<TConfig["componentType"]>[] = [
    { value: "checkbox", label: "Checkbox" },
    { value: "switch", label: "Switch" },
    { value: "radio", label: "Radio" },
    { value: "favorite", label: translate("FAVORITE") },
  ];

  return (
    <div className="grid grid-cols-12 gap-2">
      <ContainerInput className="col-span-12 md:col-span-6 lg:col-span-2">
        <Label className="whitespace-nowrap" htmlFor="selection_type">
          {translate("SELECTION_TYPE")}
        </Label>
        <Select.Container>
          <Select.Select
            id="selection_type"
            onChange={({ target }) => {
              const { value } = target;
              setConfig((prev) => ({
                ...prev,
                mode: value as TConfig["mode"],
                componentType:
                  value === "multi" && prev.componentType === "radio"
                    ? "checkbox"
                    : prev.componentType,
              }));
              setSelectedItems({});
            }}
            value={
              OPTIONS_LIST.find((item) => item.value === config.mode)?.value
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

      <ContainerInput className="col-span-12 md:col-span-6 lg:col-span-2">
        <Label className="whitespace-nowrap" htmlFor="radio_type">
          {translate("RADIO_TYPE")}
        </Label>
        <Select.Container>
          <Select.Select
            onChange={({ target }) => {
              const { value } = target;
              setConfig((prev) => ({
                ...prev,
                componentType: value as TConfig["componentType"],
                mode: value === "radio" ? "single" : prev.mode,
              }));
            }}
            value={config.componentType}
          >
            {COMPONENT_LIST.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select.Select>
          <Select.Arrow />
        </Select.Container>
      </ContainerInput>

      <ContainerInput className="col-span-12 md:col-span-6 lg:col-span-4">
        <Label htmlFor="disableSelection">
          {translate("DISABLE_SELECTION_WHEN_ID_GREATER_THAN")}
        </Label>
        <Input
          placeholder="Id"
          id="disableSelection"
          className="flex-1"
          onBeforeChange={{
            regexForReplace: /[^0-9]/g,
          }}
          onChange={({ target }) => {
            setSelectedItems({});
            setConfig((prev) => ({
              ...prev,
              disableByIdGreaterThan: Number(target.value),
            }));
          }}
        />
      </ContainerInput>

      {/* <ContainerInput className="col-span-12 md:col-span-6 lg:col-span-4">
        <Label htmlFor="search">{translate("SEARCH")}</Label>
        <TableMega.Search.Input id="search" />
      </ContainerInput> */}
    </div>
  );
}
