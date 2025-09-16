import { Column, ColumnDef, Table as TTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { JsonViewer, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
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

const DATA = makeData.person(10);

export function FilterPage() {
  const { translate } = useTranslation();

  const [globalFilter, setGlobalFilter] = useState<TFilterActive[]>([]);

  const { columns } = useColumns();

  const columns2 = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
          filterElement: (column: Column<TPerson, string>) => (
            <FilterId column={column} />
          ),
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
        header: translate("NAME"),
        minSize: 100,
        size: 100,
        enableSorting: true,
        meta: {
          align: "center",
          filterElement: (
            column: Column<TPerson, string>,
            table: TTable<TPerson>
          ) => (
            <FilterColumnBySelect
              column={column}
              table={table}
              propForFilter="name"
            />
          ),
        },
        filterFn: (row, columnId, valueFilter) =>
          valueFilter.length === 0 ||
          valueFilter.includes(row.getValue(columnId)),
      },
      columns[3],
      {
        accessorFn: (row) => formatDate(new Date(row.birthday)),
        accessorKey: "birthday",
        header: translate("BIRTHDAY"),
        minSize: 100,
        size: 100,
        sortingFn: (rowA, rowB, columnId) => {
          const dateA = stringToDate(rowA.getValue(columnId));
          const dateB = stringToDate(rowB.getValue(columnId));
          return dateB < dateA ? 1 : -1;
        },
        meta: {
          align: "center",
          filterElement: (column: Column<TPerson, string>) => (
            <FilterBirthday column={column} />
          ),
        },
        filterFn: (row, columnId, valueFilter) =>
          filterRangeDate({ row, columnId, valueFilter }),
      },
      {
        accessorKey: "email",
        header: "Email",
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
          filterElement: (
            column: Column<TPerson, string>,
            table: TTable<TPerson>
          ) => (
            <FilterColumnBySelect
              column={column}
              table={table}
              propForFilter="email"
            />
          ),
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
    <Section title={translate("FILTER")} variant="h1">
      {translate("IMPLEMENTS_FILTER_MODE")}

      <div className="flex flex-col gap-2">
        <div>
          <SuperFilter onChange={setGlobalFilter} />
        </div>

        <Table
          columns={[...columns2]}
          data={DATA}
          globalFilter={{
            filter: globalFilter,
            setFilter: setGlobalFilter,
            globalFilterFn: (row, columnId, filters) => {
              if (filters.length === 0) return true;

              return globalFilterFnCustom(row, columnId, filters);
            },
            disableInput: true,
          }}
        />
      </div>
      <JsonViewer value={globalFilter} />
    </Section>
  );
}
