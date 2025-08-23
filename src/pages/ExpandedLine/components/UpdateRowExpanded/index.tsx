import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Checkbox,
  ContainerInput,
  Datepicker,
  Input,
  Label,
} from "~/components";
import Select from "~/components/Select";
import { ROLES } from "~/constants";
import { useTranslation } from "~/hooks";
import { TPerson } from "~/types";

type Props = {
  dataToEdit: TPerson;
  onSave: (dataToUpdate: TPerson) => void;
  onCancel: () => void;
};
export function UpdateRowExpanded({ dataToEdit, onSave, onCancel }: Props) {
  const { translate } = useTranslation();
  const [formData, setFormData] = useState(dataToEdit);

  const [year, month, day] = formData.birthday.substring(0, 10).split("-");
  const dateFormatted = `${year}-${month}-${day}`;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <form
      onSubmit={handleSave}
      className="bg-green-500 p-2 flex flex-col gap-2 "
    >
      <div className="grid grid-cols-12 gap-6">
        <ContainerInput className="col-span-12 lg:col-span-3">
          <Label htmlFor="name">{translate("NAME")}</Label>
          <Input
            defaultValue={dataToEdit.name}
            onChange={handleChange}
            id="name"
          />
        </ContainerInput>

        <ContainerInput className="col-span-12 lg:col-span-3">
          <Label htmlFor="lastName">{translate("LAST_NAME")}</Label>
          <Input
            defaultValue={dataToEdit.lastName}
            onChange={handleChange}
            id="lastName"
          />
        </ContainerInput>

        <ContainerInput className="col-span-12 lg:col-span-3">
          <Label htmlFor="email">Email</Label>
          <Input defaultValue={dataToEdit.email} id="email" disabled />
        </ContainerInput>

        <ContainerInput className="col-span-12 lg:col-span-3">
          <Label htmlFor="birthday">{translate("BIRTHDAY")}</Label>
          <Datepicker
            id="birthday"
            name="birthday"
            value={dateFormatted}
            onChange={handleChange}
          />
        </ContainerInput>

        <ContainerInput className="col-span-12 lg:col-span-3">
          <Label htmlFor="role">{translate("ROLE")}</Label>
          <Select.Container>
            <Select.Select
              onChange={({ target }) => {
                const event = {
                  target: {
                    id: "role",
                    value: target?.value,
                  },
                };
                handleChange(event as ChangeEvent<HTMLInputElement>);
              }}
            >
              {ROLES.map((opt) => (
                <Select.Option
                  key={opt.value}
                  value={opt.value}
                  selected={formData?.role === opt.value}
                >
                  {opt.label}
                </Select.Option>
              ))}
            </Select.Select>

            <Select.Arrow />
          </Select.Container>
        </ContainerInput>

        <ContainerInput className="col-span-12 lg:col-span-3 items-center">
          <Label htmlFor="isActive">{translate("ACTIVE_USER")}</Label>
          <Checkbox
            checked={formData.isActive}
            id="isActive"
            onCheckedChange={(e) =>
              handleChange(e as ChangeEvent<HTMLInputElement>)
            }
          />
        </ContainerInput>

        <div className="col-span-12 lg:col-span-3 flex items-end">
          <Button variant="outlined" onClick={onCancel}>
            {translate("CANCEL")}
          </Button>
        </div>

        <div className="col-span-12 lg:col-span-3 flex items-end">
          <Button type="submit">{translate("SAVE")}</Button>
        </div>
      </div>
    </form>
  );
}
