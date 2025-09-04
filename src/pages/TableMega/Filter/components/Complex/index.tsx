import { Column, ColumnDef, Table as TTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Input, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import * as TableMega from "~/packages/TableMega";
import { TFilterActive, TPerson } from "~/types";
import {
  filterRangeDate,
  formatDate,
  globalFilterFnCustom,
  makeData,
  stringToDate,
} from "~/utils";
import { globalFilterFnInput } from "~/utils/globalFilterFnInput";
import {
  FilterBirthday,
  FilterColumnBySelect,
  FilterId,
  SuperFilter,
} from "../";

const DATA = makeData.person(5);

type TComplexFilter = {
  input: string;
  custom: TFilterActive[];
};

export function Complex() {
  const { translate } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState<TComplexFilter>({
    input: "",
    custom: [],
  });

  const { columns } = useColumns();

  const columns2 = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <div className="w-full flex items-center justify-center gap-2">
            Id
            <FilterId column={column} />
          </div>
        ),
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        filterFn: (row, columnId, valueFilter) => {
          const columnValue = Number(row.getValue(columnId));
          const [filterType, filterValue] = valueFilter;
          if (filterValue === "" && filterType === "") {
            return true;
          }

          const config: Record<string, boolean> = {
            smaller: columnValue < Number(filterValue),
            bigger: columnValue > Number(filterValue),
            equals: columnValue === Number(filterValue),
          };
          return config[filterType as string] || false;
        },
      },
      columns[1],
      {
        accessorKey: "name",
        header: ({ table, column }) => (
          <div className="w-full flex items-center justify-center gap-2">
            {translate("NAME")}
            <FilterColumnBySelect
              column={column}
              table={table}
              propForFilter="name"
            />
          </div>
        ),
        minSize: 100,
        size: 100,
        enableSorting: true,
        meta: {
          align: "center",
        },
        filterFn: (row, columnId, valueFilter) =>
          valueFilter.length === 0 ||
          valueFilter.includes(row.getValue(columnId)),
      },
      columns[3],
      {
        accessorFn: (row) => formatDate(new Date(row.birthday)),
        accessorKey: "birthday",
        header: ({ column }) => (
          <div className="w-full flex items-center justify-center gap-2">
            {translate("BIRTHDAY")}
            <FilterBirthday column={column} />
          </div>
        ),
        minSize: 100,
        size: 100,
        sortingFn: (rowA, rowB, columnId) => {
          const dateA = stringToDate(rowA.getValue(columnId));
          const dateB = stringToDate(rowB.getValue(columnId));
          return dateB < dateA ? 1 : -1;
        },
        meta: {
          align: "center",
        },
        filterFn: (row, columnId, valueFilter) =>
          filterRangeDate({ row, columnId, valueFilter }),
      },
      {
        accessorKey: "email",
        header: ({ table, column }) => (
          <div className="w-full flex items-center justify-center gap-2">
            Email
            <FilterColumnBySelect
              column={column}
              table={table}
              propForFilter="email"
            />
          </div>
        ),
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        filterFn: (row, columnId, valueFilter) =>
          valueFilter.length === 0 ||
          valueFilter.includes(row.getValue(columnId)),
      },
      columns[6],
      {
        accessorKey: "friends",
        accessorFn: (e) => e.friends.map((item) => item.name).join(" | "),
        header: translate("FRIENDS"),
        minSize: 100,
        size: 200,
        cell: (info) => info.getValue(),
        enableGlobalFilter: false,
      },
    ],
    [translate]
  );

  return (
    <Section title={translate("COMPLEX")} variant="h2">
      <TableMega.Root
        data={DATA}
        columns={[...columns2]}
        globalFilter={{
          filter: globalFilter,
          onChange: setGlobalFilter,
          globalFilterFn: (row, columnId, filters) => {
            if (!filters.input && !filters.custom.length) {
              return true;
            }

            const considerInput = !!filters.input;
            const resultInput = globalFilterFnInput(
              row,
              columnId,
              filters.input
            );

            const considerCustom = !!filters.custom.length;
            const resultCustom = globalFilterFnCustom(
              row,
              columnId,
              filters.custom
            );

            if (considerInput && considerCustom) {
              console.log(`Opa 1`, {
                value: row.getValue(columnId),
                resultInput,
                resultCustom,
              });
              return resultInput && resultCustom;
            }

            if (considerInput && !considerCustom) {
              return resultInput;
            }

            if (considerCustom && !considerInput) {
              return resultCustom;
            }
            return false;
          },
        }}
      >
        <div className="flex gap-2">
          <Input
            type="search"
            value={globalFilter.input}
            placeholder={translate("SEARCH")}
            onChange={(e) =>
              setGlobalFilter((prev) => ({ ...prev, input: e.target.value }))
            }
          />
          <SuperFilter
            onChange={(e) => {
              console.log({ e });
              setGlobalFilter((prev) => ({ ...prev, custom: e }));
            }}
          />
        </div>
        <TableMega.Table>
          <TableMega.Thead.Sort />
          <TableMega.Tbody>
            <TableMega.Rows />
          </TableMega.Tbody>
        </TableMega.Table>
      </TableMega.Root>
    </Section>
  );
}

// globalFilterFn={(row, columnId, filters) => {
//   console.log(`sajermann`, { row, columnId, filters });
//   return false;
//   // const value = row.getValue(columnId);
//   // return (
//   //   typeof value === "string" &&
//   //   value.toLocaleLowerCase().indexOf(filters.toLocaleLowerCase()) >
//   //     -1
//   // );
// }}
