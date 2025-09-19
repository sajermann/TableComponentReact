import { Checkbox, ContainerInput, Icons, Switch } from "~/components";
import { RadioItem } from "~/components";
import { TConfig } from "../../types";

type TSelectorProps = {
  disabled: boolean;
  isActivated: boolean | "indeterminate";
  onChange: (data: unknown) => void;
  componentType: TConfig["componentType"];
  rowIndex?: number;
};

export function Selector({
  disabled,
  isActivated,
  onChange,
  componentType,
  rowIndex,
}: TSelectorProps) {
  const config = {
    checkbox: (
      <Checkbox
        {...{
          disabled,
          checked: isActivated,
          onCheckedChange: onChange,
        }}
      />
    ),
    switch: (
      <Switch
        {...{
          disabled,
          checked: isActivated === true,
          onChange,
        }}
      />
    ),
    radio: (
      <RadioItem
        {...{
          disabled,
          value: String(rowIndex),
          onChange,
        }}
      />
    ),
    favorite: (
      <button
        disabled={disabled}
        onClick={onChange}
        className="w-full h-6 flex items-center justify-center hover:cursor-pointer disabled:!cursor-not-allowed disabled:!opacity-50"
      >
        <Icons
          nameIcon="star"
          fill={isActivated === true ? "#0054B6" : undefined}
          stroke="#0054B6"
        />
      </button>
    ),
  };

  return (
    <ContainerInput className="items-center">
      {config[componentType]}
    </ContainerInput>
  );
}
