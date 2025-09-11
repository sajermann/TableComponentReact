import { ChangeEvent, useState } from "react";
import { Button, ContainerInput, Input, Label } from "~/components";
import Select from "~/components/Select";
import { useTranslation } from "~/hooks";
import { objectToQuery } from "../../utils";

const DEFAULT_FILTER = {
  name: "",
  isActive: "",
};

export function Search({
  filterParams,
  setFilterParams,
  isLoading,
}: {
  filterParams: string;
  setFilterParams: (data: string) => void;
  isLoading?: boolean;
}) {
  const [filter, setFilter] = useState({ ...DEFAULT_FILTER });
  const { translate } = useTranslation();

  const DEFAULT_OPTIONS = [
    {
      value: "no",
      label: translate("NO"),
    },
    {
      value: "yes",
      label: translate("YES"),
    },
  ];

  function handleSave() {
    setFilterParams(objectToQuery(filter));
  }

  function handleClearFilter() {
    setFilter({ ...DEFAULT_FILTER });
    setFilterParams("");
  }

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = e.target;
    setFilter((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="w-full grid grid-cols-12 gap-6">
      <ContainerInput className="col-span-12 sm:col-span-4">
        <Label htmlFor="name">{translate("NAME")}</Label>
        <Input
          placeholder={translate("NAME")}
          id="name"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
      </ContainerInput>
      <ContainerInput className="col-span-12 sm:col-span-4">
        <Label htmlFor="isActive">{translate("IS_ACTIVE")}</Label>
        <Select.Container>
          <Select.Select
            required
            id="isActive"
            onChange={handleInput}
            value={
              DEFAULT_OPTIONS.find((item) => item.value === filter?.isActive)
                ?.value
            }
          >
            <Select.Placeholder>{translate("IS_ACTIVE")}</Select.Placeholder>
            {DEFAULT_OPTIONS.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select.Select>
          <Select.Arrow />
        </Select.Container>
      </ContainerInput>
      <div className="col-span-12 sm:col-span-4 flex items-end justify-center gap-2">
        <Button
          variant="option"
          colorStyle="mono"
          disabled={filterParams === "" || isLoading}
          onClick={handleClearFilter}
        >
          {translate("CLEAR")}
        </Button>
        <Button
          variant="outlined"
          colorStyle="mono"
          disabled={isLoading}
          onClick={handleSave}
        >
          {translate("FILTER")}
        </Button>
      </div>
    </div>
  );
}
