import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Chip,
  ContainerInput,
  Input,
  Label,
  Modal,
} from "~/components";
import Select from "~/components/Select";
import { useTranslation } from "~/hooks";
import { TFilterActive } from "~/types";
import { showInDevelopment } from "~/utils";

type TSuperFilterProps = {
  onChange: (data: TFilterActive[]) => void;
};

export function SuperFilter({ onChange }: TSuperFilterProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [optionColumnSelected, setOptionColumnSelected] = useState("id");
  const [optionTypeSelected, setOptionTypeSelected] = useState("equals");
  const [valueSelected, setValueSelected] = useState("");
  const [activeFilters, setActiveFilters] = useState<TFilterActive[]>([]);
  const [visibleFilters, setVisibleFilters] = useState<TFilterActive[]>([]);
  const { translate } = useTranslation();

  useEffect(() => {
    setVisibleFilters(activeFilters);
  }, [isOpenModal]);

  const optionsColumns = [
    { value: "id", label: "Id", type: "number" },
    { value: "lastName", label: translate("LAST_NAME"), type: "string" },
    { value: "role", label: translate("ROLE"), type: "string" },
  ];

  const commonsOptionsType = [
    { value: "equals", label: translate("EQUAL") },
    { value: "different", label: translate("DIFFERENT") },
  ];

  const obj = {
    string: [
      { value: "starts", label: translate("STARTS_WITH") },
      { value: "ends", label: translate("ENDS_WITH") },
      { value: "contains", label: translate("CONTAINS") },
    ],
    number: [
      { value: "bigger", label: translate("BIGGER_THAN") },
      { value: "smaller", label: translate("SMALLER_THAN") },
    ],
  };

  const optionsType = [
    ...commonsOptionsType,
    ...obj[
      (optionsColumns.find((item) => item.value === optionColumnSelected)
        ?.type as "string" | "number") || "string"
    ],
  ];

  function handleAddFilter() {
    setVisibleFilters((old) => [
      ...old,
      {
        id: new Date().toISOString(),
        column: optionColumnSelected,
        type: optionTypeSelected,
        value: valueSelected,
        labelColumn: optionsColumns.find(
          (item) => item.value === optionColumnSelected
        )?.label,
        labelType: optionsType.find((item) => item.value === optionTypeSelected)
          ?.label,
      },
    ]);

    setValueSelected("");
    setOptionColumnSelected("id");
    setOptionTypeSelected("equals");
  }

  function handleSave() {
    onChange([...visibleFilters]);
    setActiveFilters([...visibleFilters]);
    setIsOpenModal(false);
  }

  function handleClear() {
    onChange([]);
    setActiveFilters([]);
    setVisibleFilters([]);
    setIsOpenModal(false);
  }

  function handleRemoveFilter(id: string) {
    setVisibleFilters((old) =>
      old.filter(
        (item) => `${item.labelColumn} ${item.labelType} - ${item.value}` !== id
      )
    );
  }

  return (
    <>
      <Button
        {...showInDevelopment({ "data-testid": "test" })}
        onClick={() => setIsOpenModal(true)}
        variant="outlined"
        colorStyle="mono"
      >
        {translate("SUPER_FILTER")}
      </Button>

      <Modal
        title={translate("CONFIGURE_SUPER_FILTER")}
        contentProps={{
          className: "w-3/4",
        }}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        closeButton
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <ContainerInput>
              <Label htmlFor="select_column">{translate("COLUMN")}</Label>
              <Select.Container>
                <Select.Select
                  id="select_column"
                  onChange={({ target }) => {
                    setOptionColumnSelected(target?.value || "");
                  }}
                  value={
                    optionsColumns.find(
                      (item) => item.value === optionColumnSelected
                    )?.value
                  }
                >
                  {optionsColumns.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select.Select>
                <Select.Arrow />
              </Select.Container>
            </ContainerInput>
          </div>
          <div className="col-span-12 md:col-span-3">
            <ContainerInput>
              <Label htmlFor="select_type">{translate("TYPE_FILTER")}</Label>
              <Select.Container>
                <Select.Select
                  id="select_type"
                  onChange={({ target }) => {
                    setOptionTypeSelected(target?.value || "");
                  }}
                  value={
                    optionsType.find(
                      (item) => item.value === optionTypeSelected
                    )?.value
                  }
                >
                  {optionsType.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select.Select>
                <Select.Arrow />
              </Select.Container>
            </ContainerInput>
          </div>
          <div className="col-span-12 md:col-span-3">
            <ContainerInput>
              <Label htmlFor="select_value">{translate("VALUE")}</Label>
              <Input
                id="select_value"
                placeholder={translate("VALUE")}
                value={valueSelected}
                onChange={(e) => setValueSelected(e.target.value)}
                type={
                  optionsColumns.find(
                    (item) => item.value === optionColumnSelected
                  )?.type
                }
              />
            </ContainerInput>
          </div>
          <div className="col-span-3">
            <div className="flex w-full h-full items-end">
              <Button
                onClick={handleAddFilter}
                disabled={
                  optionColumnSelected === "" ||
                  optionTypeSelected === "" ||
                  valueSelected === ""
                }
                colorStyle="mono"
                variant="outlined"
              >
                {translate("ADD")}
              </Button>
            </div>
          </div>
          <div className="col-span-12">
            {visibleFilters.length > 0 && (
              <>
                {translate("ACTIVE_FILTERS")}
                <div className="flex gap-4">
                  {visibleFilters.map((item) => (
                    <Chip
                      key={item.id}
                      actionButtonProps={{
                        ...showInDevelopment({
                          "data-testid": `action-button-${item.value}`,
                        }),
                      }}
                      value={`${item.labelColumn} ${item.labelType} - ${item.value}`}
                      onRemove={handleRemoveFilter}
                    />
                  ))}
                </div>
              </>
            )}
            {visibleFilters.length === 0 && (
              <>{translate("NO_ACTIVE_FILTERS")}</>
            )}
          </div>
          <div className="col-span-12">
            <div className="flex justify-center gap-2">
              <Button variant="option" colorStyle="mono" onClick={handleClear}>
                {translate("CLEAR")}
              </Button>
              <Button variant="outlined" colorStyle="mono" onClick={handleSave}>
                {translate("CONFIRM")}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
