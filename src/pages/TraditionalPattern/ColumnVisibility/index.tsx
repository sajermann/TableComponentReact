import { useMemo, useState } from "react";
import { Section } from "~/components/Section";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { makeData } from "~/utils";
import { ColumnVisibilitySelector } from "./components/ColumnVisibilitySelector";

const data = makeData.person(5);

export function ColumnVisibilityPage() {
  const { translate } = useTranslation();
  const { columns } = useColumns();
  const [options, setOptions] = useState([
    {
      id: "id",
      label: "Id",
      show: true,
    },
    {
      id: "avatar",
      label: "Avatar",
      show: true,
    },
    {
      id: "name",
      label: translate("NAME"),
      show: true,
    },
    {
      id: "lastName",
      label: translate("LAST_NAME"),
      show: true,
    },
    {
      id: "birthday",
      label: translate("BIRTHDAY"),
      show: true,
    },
    {
      id: "email",
      label: "Email",
      show: true,
    },
    {
      id: "role",
      label: translate("ROLE"),
      show: true,
    },
    {
      id: "isActive",
      label: translate("ACTIVE"),
      show: true,
    },
  ]);

  function handleCheck({
    value,
    id,
  }: {
    value: boolean | "indeterminate";
    id: string;
  }) {
    setOptions((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            show: value as true | false,
          };
        }
        return item;
      });
    });
  }

  const columnVisibility = useMemo(() => {
    const finalResult: Record<string, boolean> = {};
    options.forEach((opt) => {
      finalResult[opt.id] = opt.show;
    });
    return finalResult;
  }, [options]);

  return (
    <Section title={translate("COLUMN_VISIBILITY")} variant="h1">
      {translate("IMPLEMENTS_COLUMN_VISIBILITY_MODE")}

      <div className="flex flex-col gap-2">
        {translate("COLUMN_VISIBILITY_WITH_STATE_FULLY_CONTROLLED")}
        <div className="flex flex-col gap-2">
          <ColumnVisibilitySelector
            options={options}
            handleCheck={handleCheck}
          />
          <Table
            columns={columns}
            data={data}
            columnVisibility={columnVisibility}
          />
        </div>
      </div>
    </Section>
  );
}
