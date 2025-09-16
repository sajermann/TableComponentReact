import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, PenIcon, SaveIcon, XIcon } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  ContainerInput,
  Datepicker,
  Input,
  Section,
} from "~/components";
import Select from "~/components/Select";
import { ROLES } from "~/constants";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { formatDate, makeData, showInDevelopment } from "~/utils";

export function EditablePage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateLine, setUpdateLine] = useState<null | {
    row: number;
    data: TPerson;
  }>(null);

  const { columns } = useColumns();

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    if (!updateLine) return;
    setUpdateLine((prev) => {
      if (!prev) return null;
      return { ...prev, data: { ...prev?.data, [id]: value } };
    });
  }

  function handleSave() {
    if (!updateLine) return;
    const newData = [...data];
    newData[updateLine.row] = { ...updateLine.data };
    setData([...newData]);
    setUpdateLine(null);
  }

  const columnsInternal = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: "id_action",
        header: translate("ACTIONS"),
        minSize: 100,
        size: 100,
        cell: (info) => (
          <div className="w-full flex items-center justify-center">
            <Button
              {...showInDevelopment({
                "data-testid": `update-button-${info.row.index}`,
              })}
              iconButton="rounded"
              variant="outlined"
              colorStyle="mono"
              onClick={() => {
                setUpdateLine({
                  row: info.row.index,
                  data: { ...info.row.original },
                });
              }}
              endIcon={<PenIcon />}
            />
          </div>
        ),
        meta: {
          align: "center",
          cellEdit: () => (
            <div className="w-full flex items-center justify-center gap-2">
              <Button
                {...showInDevelopment({
                  "data-testid": `save-button`,
                })}
                iconButton="rounded"
                colorStyle="success"
                variant="outlined"
                disabled={isLoading}
                onClick={handleSave}
                endIcon={<SaveIcon />}
              />

              <Button
                {...showInDevelopment({
                  "data-testid": `cancel-button`,
                })}
                iconButton="rounded"
                colorStyle="secondary"
                variant="outlined"
                disabled={isLoading}
                onClick={() => setUpdateLine(null)}
                endIcon={<XIcon />}
              />
            </div>
          ),
        },
      },
      columns[0],
      columns[1],
      {
        accessorKey: "name",
        header: translate("NAME"),
        minSize: 100,
        size: 100,
        enableSorting: true,
        meta: {
          align: "center",
          cellEdit: () => (
            <Input
              {...showInDevelopment({
                "data-testid": `update-input`,
              })}
              type="text"
              id="name"
              onChange={handleInput}
              value={updateLine?.data.name}
            />
          ),
        },
      },
      {
        accessorKey: "lastName",
        header: translate("LAST_NAME"),
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
          cellEdit: () => (
            <Input
              type="text"
              id="lastName"
              onChange={handleInput}
              value={updateLine?.data.lastName}
            />
          ),
        },
      },
      {
        accessorKey: "birthday",
        header: translate("BIRTHDAY"),
        minSize: 100,
        size: 100,
        cell: (info) => (
          <div>{formatDate(new Date(info.getValue() as string))}</div>
        ),
        meta: {
          align: "center",
          cellEdit: () => {
            if (!updateLine?.data.birthday) {
              return null;
            }
            const [year, month, day] = updateLine.data.birthday
              .substring(0, 10)
              .split("-");
            const dateFormatted = `${year}-${month}-${day}`;

            return (
              <Datepicker
                id="birthday"
                name="birthday"
                value={dateFormatted}
                onChange={handleInput}
              />
            );
          },
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
          cellEdit: () => (
            <Input
              type="text"
              id="email"
              onChange={handleInput}
              value={updateLine?.data.email}
            />
          ),
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
          cellEdit: () => (
            <Select.Container>
              <Select.Select
                onChange={({ target }) => {
                  const event = {
                    target: {
                      id: "role",
                      value: target?.value,
                    },
                  };
                  handleInput(event as ChangeEvent<HTMLInputElement>);
                }}
              >
                {ROLES.map((opt) => (
                  <Select.Option
                    key={opt.value}
                    value={opt.value}
                    selected={updateLine?.data.role === opt.value}
                  >
                    {opt.label}
                  </Select.Option>
                ))}
              </Select.Select>

              <Select.Arrow />
            </Select.Container>
          ),
        },
      },
      {
        accessorKey: "isActive",
        header: translate("ACTIVE"),
        minSize: 100,
        size: 100,
        cell: ({ row }) =>
          row.original.isActive ? (
            <div className="flex items-center justify-center w-full h-6 text-green-500">
              <CheckIcon />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-9 text-red-500">
              <XIcon />
            </div>
          ),
        meta: {
          align: "center",
          cellEdit: () => {
            return (
              <ContainerInput className="items-center">
                <Checkbox
                  checked={updateLine?.data.isActive}
                  id="isActive"
                  onCheckedChange={(e) => {
                    const value = e === true;
                    handleInput({
                      target: {
                        value: value as unknown as string,
                        id: "isActive",
                      },
                    } as ChangeEvent<HTMLInputElement>);
                  }}
                />
              </ContainerInput>
            );
          },
        },
      },
    ],
    [translate, updateLine]
  );

  async function load() {
    setIsLoading(true);
    setData(makeData.person(20));
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Section title={translate("EDITABLE")} variant="h1">
      {translate("IMPLEMENTS_EDITABLE_MODE")}

      <Table
        isLoading={isLoading}
        columns={[...columnsInternal]}
        data={data}
        rowForUpdate={updateLine}
      />
    </Section>
  );
}
