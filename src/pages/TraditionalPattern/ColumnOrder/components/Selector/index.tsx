import Select from "~/components/Select";

type TSelectorProps = {
  value?: React.ComponentProps<typeof Select.Select>["value"];
  defaultValue?: React.ComponentProps<typeof Select.Select>["defaultValue"];
  onChange: (data: string) => void;
  optionsList: {
    id: string;
    content: string;
  }[];
};

export function Selector({
  defaultValue,
  value,
  onChange,
  optionsList,
}: TSelectorProps) {
  return (
    <Select.Container>
      <Select.Select
        onChange={({ target }) => onChange(target.value)}
        value={value}
        defaultValue={defaultValue}
      >
        {optionsList.map((opt) => (
          <Select.Option key={opt.id} value={opt.content}>
            {opt.content}
          </Select.Option>
        ))}
      </Select.Select>
      <Select.Arrow />
    </Select.Container>
  );
}
