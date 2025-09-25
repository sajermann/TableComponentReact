import { Column } from "@tanstack/react-table";
import { FunnelIcon, SaveIcon, TrashIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button, ContainerInput, Input } from "~/components";
import { Popover } from "~/components/Popover";
import Select from "~/components/Select";
import { useTranslation } from "~/hooks";
import { TPerson } from "~/types";
import { managerClassNames } from "~/utils";

type TOptionsProps = {
  value: string;
  label: string;
};

export function FilterId({ column }: { column: Column<TPerson, unknown> }) {
  const { translate } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectType, setSelectType] = useState<TOptionsProps | null>(null);
  const [filterValue, setFilterValue] = useState("");

  const OPTIONS: TOptionsProps[] = [
    { value: "equals", label: translate("EQUAL") },
    { value: "bigger", label: translate("BIGGER_THAN") },
    { value: "smaller", label: translate("SMALLER_THAN") },
  ];

  function verifyFillFilter() {
    const filterValueTemp = column.getFilterValue() as string[];
    if (
      !filterValueTemp ||
      filterValueTemp[0] === "" ||
      filterValueTemp[1] === ""
    ) {
      return false;
    }
    return true;
  }

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onInteractOutside={() => setIsOpen(false)}
      trigger={
        <button
          className="w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity duration-500"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <FunnelIcon
            className={managerClassNames([
              "h-4.5  w-4.5",
              { "fill-white": verifyFillFilter() },
            ])}
          />
        </button>
      }
    >
      <>
        <div className="flex flex-col gap-4">
          <div className="w-48">
            <ContainerInput>
              <Select.Container>
                <Select.Select
                  required
                  id="select_column"
                  onChange={({ target }) => {
                    setSelectType(
                      OPTIONS.find((item) => item.value === target?.value) ||
                        null
                    );
                  }}
                  value={
                    OPTIONS.find((item) => item.value === selectType?.value)
                      ?.value
                  }
                >
                  <Select.Placeholder>
                    {translate("FILTER_TYPE")}
                  </Select.Placeholder>
                  {OPTIONS.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select.Select>
                <Select.Arrow />
              </Select.Container>
            </ContainerInput>
          </div>
          <div className="w-48">
            <ContainerInput>
              <Input
                placeholder={translate("TYPE_VALUE_FOR_FILTER")}
                onChange={(e) => setFilterValue(e.target.value)}
                value={filterValue}
              />
            </ContainerInput>
          </div>
        </div>

        <div className="w-full flex justify-center gap-4 mt-4">
          <Button
            iconButton="rounded"
            colorStyle="mono"
            variant="outlined"
            onClick={() => {
              column.setFilterValue(undefined);
              setFilterValue("");
              setIsOpen(false);
            }}
            endIcon={<TrashIcon />}
          />

          <Button
            iconButton="rounded"
            colorStyle="mono"
            variant="outlined"
            onClick={() => {
              console.log(`sajermann`, [selectType?.value, filterValue]);
              column.setFilterValue([selectType?.value, filterValue]);
              setIsOpen(false);
            }}
            disabled={!filterValue}
            endIcon={<SaveIcon />}
          />
        </div>
      </>
    </Popover>
  );
}
