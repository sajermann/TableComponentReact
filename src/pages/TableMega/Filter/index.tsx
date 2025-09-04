import { Column, ColumnDef, Table as TTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Section } from "~/components";
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
import {
  FilterBirthday,
  FilterColumnBySelect,
  FilterId,
  SuperFilter,
} from "./components";
import { Complex } from "./components/Complex";
import { Simple } from "./components/Simple";

export function TableMegaFilterPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>([]);
  const [globalFilter, setGlobalFilter] = useState<TFilterActive[]>([]);

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

  useEffect(() => {
    setData(makeData.person(5));
  }, []);

  return (
    <Section title={translate("FILTER")} variant="h1">
      {translate("IMPLEMENTS_FILTER_MODE")}
      <div className="flex flex-col gap-5">
        {/* <Simple /> */}
        <Complex />
      </div>
    </Section>
  );
}
