import { Row } from "@tanstack/react-table";
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
import { managerClassNames } from "~/packages/TableMega/utils/managerClassNames";
import { TPerson } from "~/types";

const DEFAULT_VALUE: TPerson = {
  avatar: "",
  birthday: "",
  email: "",
  friends: [],
  id: "",
  isActive: true,
  lastName: "",
  name: "",
  role: "User",
};

type TUpdateDataProps<T> = {
  dataToEdit?: TPerson;
  onSave?: ({
    dataToUpdate,
    row,
  }: {
    dataToUpdate: Partial<TPerson>;
    row?: Row<T>;
  }) => void;
  onCancel?: ({ row }: { row?: Row<T> }) => void;
  row?: Row<T>;
};
export function UpdateData({
  onCancel,
  onSave,
  row,
}: TUpdateDataProps<TPerson>) {
  console.log({ row });
  const { translate } = useTranslation();
  const formData = row?.original || DEFAULT_VALUE;
  const [year, month, day] = formData?.birthday.substring(0, 10).split("-");
  const dateFormatted = `${year}-${month}-${day}`;

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event?.currentTarget);
    const dataObj = Object.fromEntries(formData.entries());
    onSave?.({
      row,
      dataToUpdate: { ...dataObj, isActive: dataObj.isActive === "on" },
    });
  }

  return (
    <form
      onSubmit={handleSave}
      className={managerClassNames(["p-2 flex flex-col gap-2"])}
    >
      <div className="grid grid-cols-12 gap-6">
        <ContainerInput className="col-span-12 lg:col-span-3">
          <Label htmlFor="name">{translate("NAME")}</Label>
          <Input id="name" name="name" defaultValue={formData.name} />
        </ContainerInput>

        <ContainerInput className="col-span-12 lg:col-span-3">
          <Label htmlFor="lastName">{translate("LAST_NAME")}</Label>
          <Input
            id="lastName"
            name="lastName"
            defaultValue={formData.lastName}
          />
        </ContainerInput>

        <ContainerInput className="col-span-12 lg:col-span-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            defaultValue={formData.email}
            disabled
          />
        </ContainerInput>

        <ContainerInput className="col-span-12 lg:col-span-3">
          <Label htmlFor="birthday">{translate("BIRTHDAY")}</Label>
          <Datepicker
            id="birthday"
            name="birthday"
            defaultValue={dateFormatted}
          />
        </ContainerInput>

        <ContainerInput className="col-span-12 lg:col-span-3">
          <Label htmlFor="role">{translate("ROLE")}</Label>
          <Select.Container>
            <Select.Select id="role" name="role" defaultValue={formData.role}>
              {ROLES.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
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
            id="isActive"
            name="isActive"
            defaultChecked={formData.isActive}
          />
        </ContainerInput>

        <div className="col-span-12 lg:col-span-3 flex items-end">
          <Button variant="outlined" onClick={() => onCancel?.({ row })}>
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
