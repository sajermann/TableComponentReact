import { Column, ColumnDef, Table as TTable } from "@tanstack/react-table";
import jsonLogic from "json-logic-js";
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

jsonLogic.add_operation("startsWith", (str, prefix) => {
  if (typeof str !== "string" || typeof prefix !== "string") return false;
  return str.startsWith(prefix);
});

jsonLogic.add_operation("endsWith", (str, prefix) => {
  if (typeof str !== "string" || typeof prefix !== "string") return false;
  return str.endsWith(prefix);
});

// const DATA = makeData.person(5);
// console.log({ DATA });
const DATA = [
  {
    id: "1",
    name: "Mafalda",
    lastName: "Fisher",
    birthday: "2018-01-03T09:51:08.522Z",
    email: "mafalda_fisher@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/77633550",
    role: "Dev",
    isActive: true,
    friends: [
      {
        id: "1",
        name: "Cantabrian Water Dog",
      },
    ],
  },
  {
    id: "2",
    name: "Vincenza",
    lastName: "Kemmer",
    birthday: "2015-03-08T02:19:42.111Z",
    email: "vincenza_kemmer@gmail.com",
    avatar:
      "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/95.jpg",
    role: "Admin",
    isActive: true,
    friends: [
      {
        id: "1",
        name: "Schweizer Laufhund",
      },
    ],
  },
  {
    id: "3",
    name: "Linda",
    lastName: "Paucek",
    birthday: "2011-01-29T16:33:55.738Z",
    email: "linda_paucek@hotmail.com",
    avatar:
      "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/71.jpg",
    role: "Admin",
    isActive: true,
    friends: [
      {
        id: "1",
        name: "Hammond's Flycatcher",
      },
      {
        id: "2",
        name: "Sabueso Español",
      },
    ],
  },
  {
    id: "4",
    name: "Kaleigh",
    lastName: "Feest",
    birthday: "1976-10-05T02:02:06.788Z",
    email: "kaleigh_feest@hotmail.com",
    avatar: "https://avatars.githubusercontent.com/u/15297843",
    role: "Dev",
    isActive: false,
    friends: [
      {
        id: "1",
        name: "Groove-billed Ani",
      },
    ],
  },
  {
    id: "5",
    name: "Maximus",
    lastName: "Hackett",
    birthday: "1985-10-16T06:17:25.127Z",
    email: "maximus_hackett@outlook.com",
    avatar: "https://avatars.githubusercontent.com/u/77998924",
    role: "User",
    isActive: false,
    friends: [
      {
        id: "1",
        name: "Pug",
      },
    ],
  },
];
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

  const convertComplexFilterToJsonLogic = (filter: TComplexFilter) => {
    //  const filterRule = {
    //           and: [
    //             { ">": [{ var: "id" }, 1] },
    //             { "<": [{ var: "id" }, 5] },
    //             { "==": [{ var: "name" }, "Linda"] },
    //           ],
    //         };
    const filterRule: jsonLogic.RulesLogic<jsonLogic.AdditionalOperation> = {
      and: [],
      or: [
        // or dentro do and
      ],
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

    return filterRule;
  };

  return (
    <Section title={translate("COMPLEX")} variant="h2">
      <TableMega.Root
        data={DATA}
        columns={[...columns2] as any}
        globalFilter={{
          filter: globalFilter,
          onChange: setGlobalFilter,
          globalFilterFn: (row, _, filters) => {
            try {
              const filterRule = convertComplexFilterToJsonLogic(filters);
              const result = jsonLogic.apply(filterRule, { ...row.original });
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
            placeholder={translate("SEARCH")}
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
