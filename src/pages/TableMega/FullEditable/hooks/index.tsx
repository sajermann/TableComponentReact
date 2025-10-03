import { ColumnDef } from "@tanstack/react-table";
import { FormEvent, useMemo, useState } from "react";
import { Checkbox, ContainerInput, Datepicker, Input } from "~/components";
import Select from "~/components/Select";
import { useTranslation } from "~/hooks";
import { TPerson } from "~/types";
import { makeData, showInDevelopment } from "~/utils";
import { handleFormSubmit } from "../utils";

const DEFAULT_OPTIONS = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "User",
    label: "User",
  },
  {
    value: "Dev",
    label: "Dev",
  },
];

export function useFullEditable() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>(makeData.person(5));

  const columns = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "avatar",
        header: "Avatar",
        minSize: 60,
        size: 60,
        meta: {
          align: "left",
        },
        cell: ({ getValue, row }) => (
          <div className="w-14 h-14 flex items-center justify-center">
            <img
              className="w-full rounded-full"
              src={getValue<string>()}
              alt={`Image row index ${row.index}`}
            />
          </div>
        ),
        enableResizing: false,
        enableSorting: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "name",
        header: translate("NAME"),
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        enableSorting: true,
        cell: ({ row, getValue }) => (
          <Input
            {...showInDevelopment({
              "data-testid": `input-name-${row.index}`,
            })}
            type="text"
            id={`name-${row.index}`}
            name={`name-${row.index}`}
            defaultValue={getValue<string>()}
          />
        ),
      },
      {
        accessorKey: "lastName",
        header: translate("LAST_NAME"),
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        cell: ({ row, getValue }) => (
          <Input
            {...showInDevelopment({
              "data-testid": `input-lastName-${row.index}`,
            })}
            type="text"
            id={`lastName-${row.index}`}
            name={`lastName-${row.index}`}
            defaultValue={getValue<string>()}
          />
        ),
      },
      {
        accessorKey: "birthday",
        header: translate("BIRTHDAY"),
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        cell: ({ row, getValue }) => {
          const [year, month, day] = getValue<string>()
            .substring(0, 10)
            .split("-");
          const dateFormatted = `${year}-${month}-${day}`;
          return (
            <Datepicker
              id={`birthday-${row.index}`}
              name={`birthday-${row.index}`}
              defaultValue={dateFormatted}
            />
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        cell: ({ row }) => (
          <Select.Container>
            <Select.Select name={`role-${row.index}`}>
              {DEFAULT_OPTIONS.map((opt) => (
                <Select.Option
                  key={opt.value}
                  defaultValue={opt.value}
                  selected={row.original.role === opt.value}
                >
                  {opt.label}
                </Select.Option>
              ))}
            </Select.Select>

            <Select.Arrow />
          </Select.Container>
        ),
      },
      {
        accessorKey: "isActive",
        header: translate("ACTIVE"),
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        cell: ({ row, getValue }) => (
          <ContainerInput className="items-center">
            <Checkbox
              {...showInDevelopment({
                "data-testid": `checkbox-isActive-${row.index}`,
              })}
              defaultChecked={getValue<boolean>()}
              name={`isActive-${row.index}`}
            />
          </ContainerInput>
        ),
      },
    ],
    []
  );

  return {
    columns,
    data,
    handleFormSubmit: (event?: FormEvent<HTMLFormElement>) =>
      handleFormSubmit({ event, setData }),
  };
}
