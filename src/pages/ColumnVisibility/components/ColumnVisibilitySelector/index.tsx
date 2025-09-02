import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox, ContainerInput, Label } from "~/components";
import { useTranslation } from "~/hooks";

type TColumnVisibilitySelectorProps = {
  handleCheck: (data: {
    target: {
      value: CheckedState;
      id: string | undefined;
    };
  }) => void;
  options: {
    id: string;
    label: string;
    show: boolean;
  }[];
};

export function ColumnVisibilitySelector({
  handleCheck,
  options,
}: TColumnVisibilitySelectorProps) {
  const { translate } = useTranslation();

  return (
    <div className="flex flex-col justify-center text-center">
      <div>{translate("COLUMNS_VISIBLED")}</div>
      <div className="flex justify-center text-center gap-4 flex-wrap">
        {options.map((item) => (
          <ContainerInput key={item.id} className="items-center w-fit">
            <Label htmlFor={item.id}>{item.label}</Label>
            <Checkbox
              checked={item.show}
              onCheckedChange={handleCheck}
              id={item.id}
            />
          </ContainerInput>
        ))}
      </div>
    </div>
  );
}
