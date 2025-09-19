import { ColumnDef } from "@tanstack/react-table";
import { ChangeEvent, useMemo, useState } from "react";
import {
  Checkbox,
  ContainerInput,
  Datepicker,
  Input,
  JsonViewer,
  Section,
} from "~/components";
import Select from "~/components/Select";
import { useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData, showInDevelopment } from "~/utils";

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

export function FullEditablePage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>(makeData.person(5));

  function handleInput(e: ChangeEvent<HTMLInputElement>, indexRow: number) {
    const { id, value } = e.target;

    setData((old) =>
      old.map((row, index) => {
        if (index === indexRow) {
          return {
            ...old[indexRow]!,
            [id]: value,
          };
        }
        return row;
      })
    );
  }

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
        cell: ({ getValue }) => (
          <div className="w-14 h-14 flex items-center justify-center">
            <img
              className="w-full rounded-full"
              src={getValue() as string}
              alt=""
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
        cell: (info) => (
          <Input
            {...showInDevelopment({
              "data-testid": `input-name-${info.row.index}`,
            })}
            type="text"
            id="name"
            onChange={(e) => handleInput(e, info.row.index)}
            value={info.getValue() as string}
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
        cell: (info) => (
          <Input
            {...showInDevelopment({
              "data-testid": `input-lastName-${info.row.index}`,
            })}
            type="text"
            id="lastName"
            onChange={(e) => handleInput(e, info.row.index)}
            value={info.getValue() as string}
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
        cell: (info) => {
          const [year, month, day] = (info.getValue() as string)
            .substring(0, 10)
            .split("-");
          const dateFormatted = `${year}-${month}-${day}`;
          return (
            <Datepicker
              id="birthday"
              name="birthday"
              value={dateFormatted}
              onChange={(e) => handleInput(e, info.row.index)}
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
        cell: (info) => (
          <Select.Container>
            <Select.Select
              onChange={({ target }) => {
                const event = {
                  target: {
                    id: "role",
                    value: target?.value,
                  },
                };
                handleInput(
                  event as ChangeEvent<HTMLInputElement>,
                  info.row.index
                );
              }}
            >
              {DEFAULT_OPTIONS.map((opt) => (
                <Select.Option
                  key={opt.value}
                  value={opt.value}
                  selected={info.row.original.role === opt.value}
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
        cell: (info) => (
          <ContainerInput className="items-center">
            <Checkbox
              {...showInDevelopment({
                "data-testid": `checkbox-isActive-${info.row.index}`,
              })}
              checked={info.getValue() as boolean}
              id="isActive"
              onCheckedChange={(e) => {
                const value = e === true;
                handleInput(
                  {
                    target: {
                      value: value as unknown as string,
                      id: "isActive",
                    },
                  } as ChangeEvent<HTMLInputElement>,
                  info.row.index
                );
              }}
            />
          </ContainerInput>
        ),
      },
    ],
    []
  );

  return (
    <Section title={translate("FULL_EDITABLE")} variant="h1">
      {translate("IMPLEMENTS_FULL_EDITABLE_MODE")}

      <Table columns={columns} data={data} />
      <span className="text-sm italic">
        {translate("NOTE_DATA_UPDATED_REAL_TIME")}
      </span>
      <JsonViewer value={data} />
    </Section>
  );
}
