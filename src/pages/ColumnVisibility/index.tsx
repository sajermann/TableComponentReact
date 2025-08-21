import { useEffect, useState } from "react";
import { Checkbox, ContainerInput, Label } from "~/components";
import { Section } from "~/components/Section";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

export function ColumnVisibilityPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>([]);
  const [hide, setHide] = useState<Record<string, boolean>>({
    id: true,
    avatar: true,
    name: true,
    lastName: true,
    birthday: true,
    email: true,
    role: true,
    isActive: true,
  });

  const { columns } = useColumns();

  useEffect(() => {
    setData(makeData.person(5));
  }, []);

  function handleCheck(e: {
    target: {
      value: boolean | "indeterminate";
      id: string | undefined;
    };
  }) {
    const { value, id } = e.target;

    setHide((prev) => ({ ...prev, [id as string]: value as boolean }));
  }

  const OPTIONS = [
    {
      checked: hide.id,
      id: "id",
      label: "Id",
    },
    {
      checked: hide.avatar,
      id: "avatar",
      label: "Avatar",
    },
    {
      checked: hide.name,
      id: "name",
      label: translate("NAME"),
    },
    {
      checked: hide.lastName,
      id: "lastName",
      label: translate("LAST_NAME"),
    },
    {
      checked: hide.birthday,
      id: "birthday",
      label: translate("BIRTHDAY"),
    },
    {
      checked: hide.email,
      id: "email",
      label: "Email",
    },
    {
      checked: hide.role,
      id: "role",
      label: translate("ROLE"),
    },
    {
      checked: hide.isActive,
      id: "isActive",
      label: translate("ACTIVE"),
    },
  ];

  return (
    <Section title={translate("COLUMN_VISIBILITY")} variant="h1">
      {translate("IMPLEMENTS_COLUMN_VISIBILITY_MODE")}

      <div className="flex flex-col gap-2">
        {translate("COLUMN_VISIBILITY_WITH_STATE_FULLY_CONTROLLED")}

        <div className="flex flex-col justify-center text-center">
          <div>{translate("COLUMNS_VISIBLED")}</div>
          <div className="flex justify-center text-center gap-4 flex-wrap">
            {OPTIONS.map((item) => (
              <ContainerInput key={item.id} className="items-center w-28">
                <Label htmlFor={item.id}>{item.label}</Label>
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={handleCheck}
                  id={item.id}
                />
              </ContainerInput>
            ))}
          </div>
        </div>
        <Table columns={columns} data={data} columnVisibility={hide} />
      </div>
    </Section>
  );
}
