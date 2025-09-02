import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, PenIcon, SaveIcon, XIcon } from "lucide-react";
import { FormEvent, useCallback, useMemo, useState } from "react";
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
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { formatDate, makeData, showInDevelopment } from "~/utils";

export function TableMegaEditableRowPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>(makeData.person(10));
  const [updateLine, setUpdateLine] = useState<null | {
    row: number;
    data: TPerson;
  }>(null);

  const columnsInternal = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: "id_action",
        header: translate("ACTIONS"),
        minSize: 100,
        size: 100,
        cell: (info) =>
          updateLine?.row === info.row.index ? (
            <div className="w-full flex items-center justify-center gap-2">
              <Button
                {...showInDevelopment({
                  "data-testid": `save-button`,
                })}
                iconButton="rounded"
                colorStyle="success"
                variant="outlined"
                endIcon={<SaveIcon />}
                type="submit"
              />

              <Button
                {...showInDevelopment({
                  "data-testid": `cancel-button`,
                })}
                iconButton="rounded"
                colorStyle="secondary"
                variant="outlined"
                onClick={() => setUpdateLine(null)}
                endIcon={<XIcon />}
              />
            </div>
          ) : (
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
        },
      },
      {
        accessorKey: "id",
        accessorFn: (e) => Number(e.id),
        header: "Id",
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        enableResizing: false,
        enableMultiSort: true,
      },
      {
        accessorKey: "avatar",
        header: "Avatar",
        minSize: 60,
        size: 60,
        meta: {
          align: "center",
        },
        cell: ({ getValue }) => (
          <div className="w-full flex items-center justify-center">
            <div className="w-14 h-full">
              <img className="rounded-full" src={getValue() as string} alt="" />
            </div>
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
        enableSorting: true,
        cell: (info) =>
          updateLine?.row === info.row.index ? (
            <Input
              {...showInDevelopment({
                "data-testid": `update-input`,
              })}
              type="text"
              name="name"
              defaultValue={updateLine?.data.name}
            />
          ) : (
            info.cell.getValue()
          ),
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "lastName",
        header: translate("LAST_NAME"),
        minSize: 100,
        size: 100,
        cell: ({ row, cell }) =>
          updateLine?.row === row.index ? (
            <Input
              {...showInDevelopment({
                "data-testid": `update-input`,
              })}
              type="text"
              name="lastName"
              defaultValue={updateLine?.data.lastName}
            />
          ) : (
            cell.getValue()
          ),
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "birthday",
        header: translate("BIRTHDAY"),
        minSize: 100,
        size: 100,
        cell: (info) => {
          if (updateLine?.row === info.row.index && updateLine?.data.birthday) {
            const [year, month, day] = updateLine.data.birthday
              .substring(0, 10)
              .split("-");
            const dateFormatted = `${year}-${month}-${day}`;
            return (
              <Datepicker
                id="birthday"
                name="birthday"
                defaultValue={dateFormatted}
              />
            );
          }
          return <div>{formatDate(new Date(info.getValue() as string))}</div>;
        },
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        minSize: 100,
        size: 100,
        cell: ({ row, cell }) =>
          updateLine?.row === row.index ? (
            <Input
              {...showInDevelopment({
                "data-testid": `update-input`,
              })}
              type="text"
              name="email"
              defaultValue={updateLine?.data.email}
            />
          ) : (
            cell.getValue()
          ),
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        minSize: 100,
        size: 100,
        cell: (info) =>
          updateLine?.row === info.row.index ? (
            <Select.Container>
              <Select.Select name="role">
                {ROLES.map((opt) => (
                  <Select.Option
                    key={opt.value}
                    defaultValue={opt.value}
                    selected={updateLine?.data.role === opt.value}
                  >
                    {opt.label}
                  </Select.Option>
                ))}
              </Select.Select>

              <Select.Arrow />
            </Select.Container>
          ) : (
            info.cell.getValue()
          ),
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "isActive",
        header: translate("ACTIVE"),
        minSize: 100,
        size: 100,
        cell: ({ row }) => {
          if (updateLine?.row === row.index) {
            return (
              <ContainerInput className="items-center">
                <Checkbox
                  defaultChecked={updateLine?.data.isActive}
                  name="isActive"
                />
              </ContainerInput>
            );
          }
          if (row.original.isActive) {
            return (
              <div className="flex items-center justify-center w-full h-6 text-green-500">
                <CheckIcon />
              </div>
            );
          } else {
            return (
              <div className="flex items-center justify-center w-full h-9 text-red-500">
                <XIcon />
              </div>
            );
          }
        },
        meta: {
          align: "center",
        },
      },
    ],
    [translate, updateLine?.row]
  );

  const handleFormSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      const formData = new FormData(event?.currentTarget);
      const dataObj = Object.fromEntries(formData.entries());
      if (!updateLine) return;
      const newData = [...data];
      newData[updateLine.row] = {
        ...updateLine.data,
        ...dataObj,
        isActive: dataObj?.isActive === "on",
      };
      setData([...newData]);
      setUpdateLine(null);
    },
    [updateLine]
  );

  return (
    <Section title={translate("EDITABLE")} variant="h1">
      {translate("IMPLEMENTS_EDITABLE_MODE")}
      <form onSubmit={handleFormSubmit}>
        <TableMega.Root data={data} columns={[...columnsInternal]}>
          <TableMega.Table>
            <TableMega.Thead />
            <TableMega.Tbody>
              <TableMega.Rows />
            </TableMega.Tbody>
          </TableMega.Table>
        </TableMega.Root>
      </form>
    </Section>
  );
}
