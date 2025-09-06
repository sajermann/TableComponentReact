import { Checkbox, ContainerInput, Label } from "~/components";
import Select from "~/components/Select";
import { useTranslation } from "~/hooks";

const DEFAULT_OPTIONS = [
  {
    value: "WITH_DATA",
    label: "WITH_DATA",
  },
  {
    value: "WITHOUT_DATA",
    label: "WITHOUT_DATA",
  },
];

type TSelectorProps = {
  withData: boolean;
  isLoading: boolean;
  onChange: (data: { withData: boolean; isLoading: boolean }) => void;
};

export function Selector({ withData, isLoading, onChange }: TSelectorProps) {
  const { translate } = useTranslation();
  return (
    <div className="flex gap-2">
      <ContainerInput>
        <Label htmlFor="view">{translate("VIEW_MODE")}</Label>
        <Select.Container>
          <Select.Select
            id="view"
            onChange={({ target }) => {
              onChange({ isLoading, withData: target.value === "WITH_DATA" });
            }}
          >
            {DEFAULT_OPTIONS.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {translate(opt.label)}
              </Select.Option>
            ))}
          </Select.Select>

          <Select.Arrow />
        </Select.Container>
      </ContainerInput>

      <ContainerInput className="w-fit flex- items-center">
        <Label className="whitespace-nowrap" htmlFor="active">
          {translate("ACTIVE_LOADING")}
        </Label>
        <Checkbox
          id="active"
          checked={isLoading}
          onCheckedChange={(e) => onChange({ withData, isLoading: e === true })}
        />
      </ContainerInput>
    </div>
  );
}
