import { ColumnDef } from "@tanstack/react-table";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  ContainerInput,
  Datepicker,
  Input,
  JsonViewer,
  Section,
} from "~/components";
import Select from "~/components/Select";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { makeData, showInDevelopment } from "~/utils";

// TODO: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.

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

function getFormattedValues(data: Record<string, unknown>, prop: string) {
  return Object.entries(data)
    .filter(([key]) => key.startsWith(`${prop}-`))
    .map(([key, value]) => ({
      row: Number(key.split("-")[1]),
      value,
    }));
}

export function TableMegaFullEditablePage() {
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

  const handleFormSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      const formData = new FormData(event?.currentTarget);
      const dataObj = Object.fromEntries(formData.entries());
      const resultName = getFormattedValues(dataObj, "name");
      const resultLastName = getFormattedValues(dataObj, "lastName");
      const resultBirthday = getFormattedValues(dataObj, "birthday");
      const resultRole = getFormattedValues(dataObj, "role");
      const resultIsActive = getFormattedValues(dataObj, "isActive");
      setData((prev) => {
        return prev.map((item, index) => {
          return {
            ...item,
            name: resultName.find((r) => r.row === index)?.value || "",
            lastName: resultLastName.find((r) => r.row === index)?.value || "",
            birthday: resultBirthday.find((r) => r.row === index)?.value || "",
            role: resultRole.find((r) => r.row === index)?.value || "User",
            isActive:
              resultIsActive.find((r) => r.row === index)?.value === "on",
          } as TPerson;
        });
      });
    },
    [setData]
  );

  return (
    <Section title={translate("FULL_EDITABLE")} variant="h1">
      <form onSubmit={handleFormSubmit}>
        <TableMega.Root data={data} columns={columns}>
          <div className="flex justify-between w-full">
            {translate("IMPLEMENTS_FULL_EDITABLE_MODE")}
            <Button colorStyle="mono" variant="outlined">
              {translate("SAVE")}
            </Button>
          </div>
          <TableMega.Table>
            <TableMega.Thead.Sort />
            <TableMega.Tbody>
              <TableMega.Rows />
            </TableMega.Tbody>
          </TableMega.Table>
        </TableMega.Root>
      </form>
      <div className="flex flex-col gap-2">
        <span className="text-sm italic">
          {translate("NOTE_UPDATED_AFTER_SAVE_SUBMIT")}
        </span>
        <JsonViewer value={data} />
      </div>
    </Section>
  );
}
