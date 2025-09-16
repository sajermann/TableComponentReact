import { Checkbox, ContainerInput, Label } from "~/components";

type TColumnVisibilitySelectorProps = {
  handleCheck: (data: { value: boolean | "indeterminate"; id: string }) => void;
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
  return (
    <div className="flex justify- text-center gap-4 flex-wrap">
      {options.map((item) => (
        <ContainerInput key={item.id} className="items-center w-fit">
          <Label htmlFor={item.id}>{item.label}</Label>
          <Checkbox
            checked={item.show}
            onCheckedChange={(value) => handleCheck({ value, id: item.id })}
            id={item.id}
          />
        </ContainerInput>
      ))}
    </div>
  );
}
