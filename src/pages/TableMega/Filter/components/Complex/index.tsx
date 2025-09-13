import { ColumnDef } from "@tanstack/react-table";
import jsonLogic from "json-logic-js";
import { useMemo, useState } from "react";
import { Input, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TFilterActive, TPerson } from "~/types";
import { filterRangeDate, formatDate, makeData, stringToDate } from "~/utils";
import {
  FilterBirthday,
  FilterColumnBySelect,
  FilterId,
  SuperFilter,
} from "../";

// TODO: Olhar console log e ver erro de rerender

jsonLogic.add_operation("startsWith", (str, prefix) => {
  if (typeof str !== "string" || typeof prefix !== "string") return false;
  return str.startsWith(prefix);
});

jsonLogic.add_operation("endsWith", (str, prefix) => {
  if (typeof str !== "string" || typeof prefix !== "string") return false;
  return str.endsWith(prefix);
});

const convertComplexFilterToJsonLogic = (filter: TComplexFilter) => {
  const filterRule: jsonLogic.RulesLogic<jsonLogic.AdditionalOperation> = {
    and: [],
  };

  const config = {
    different: "!=",
    equals: "==",
    bigger: ">",
    smaller: "<",
    starts: "startsWith",
    ends: "endsWith",
    contains: "in",
  };

  for (const item of filter.custom) {
    if (item.type === "contains") {
      filterRule.and.push({
        [config[item.type]]: [item.value, { var: item.column }],
      });
    } else {
      filterRule.and.push({
        [config[item.type]]: [{ var: item.column }, item.value],
      });
    }
  }

  filterRule.and.push({
    or: [
      { in: [filter.input, { var: "email" }] },
      { in: [filter.input, { var: "friends" }] },
    ],
  });

  return filterRule;
};

const DATA = makeData.person(10);

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
        accessorFn: ({ id }) => Number(id),
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
          globalFilterFn: (row, _, filters) => {
            try {
              const filterRule = convertComplexFilterToJsonLogic(filters);
              const result = jsonLogic.apply(filterRule, {
                ...row.original,
                friends: row.original.friends.map((f) => f.name).join(" | "),
              });
              return result === undefined || result === true;
            } catch (error) {
              console.log({ error });
              return true;
            }
          },
        }}
      >
        <div className="flex gap-2">
          <Input
            type="search"
            value={globalFilter.input}
            placeholder={translate("SEARCH_ON_EMAIL_AND_FRIENDS")}
            onChange={(e) =>
              setGlobalFilter((prev) => ({ ...prev, input: e.target.value }))
            }
          />
          <SuperFilter
            onChange={(e) => {
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
