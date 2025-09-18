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
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { makeData, showInDevelopment } from "~/utils";

export function TableMegaEditableByRowPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>(makeData.person(10));
  const [updateLine, setUpdateLine] = useState<null | {
    row: number;
    data: TPerson;
  }>(null);

  const { columns } = useColumns();

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
      { ...columns[0] },
      { ...columns[1] },
      {
        ...columns[2],
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
      },
      {
        ...columns[3],
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
      },
      {
        ...columns[4],
        cell: ({ row, getValue }) => {
          if (updateLine?.row === row.index && updateLine?.data.birthday) {
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
          return <div>{getValue<string>()}</div>;
        },
      },
      {
        ...columns[5],
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
      },
      {
        ...columns[6],
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
      },
      {
        ...columns[7],
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
    <Section title={translate("EDITABLE_BY_ROW")} variant="h1">
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
