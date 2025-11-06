import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  FilterBirthday,
  FilterColumnBySelect,
  FilterId,
} from "~/components/Filter";
import { useColumns, useTranslation } from "~/hooks";
import { TPerson } from "~/types";
import { filterRangeDate } from "~/utils";
import {
  TComplexFilter,
  convertComplexFilterToJsonLogic,
  globalFilterFn,
} from "../utils";

export function useComplex() {
  const { translate } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState<TComplexFilter>({
    input: "",
    custom: [],
  });

  const { columns } = useColumns();

  const columns2 = useMemo<ColumnDef<TPerson>[]>(
    () => [
      {
        ...columns[0],
        meta: {
          align: "center",
          filterElement: FilterId,
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
        ...columns[2],
        meta: {
          align: "center",
          filterElement: (props) => (
            <FilterColumnBySelect {...props} propForFilter="name" />
          ),
        },
        filterFn: (row, columnId, valueFilter) =>
          valueFilter.length === 0 ||
          valueFilter.includes(row.getValue(columnId)),
      },
      columns[3],
      {
        ...columns[4],
        meta: {
          align: "center",
          filterElement: FilterBirthday,
        },
        filterFn: (row, columnId, valueFilter) =>
          filterRangeDate({ row, columnId, valueFilter }),
      },
      {
        ...columns[5],
        meta: {
          align: "center",
          filterElement: (props) => (
            <FilterColumnBySelect {...props} propForFilter="email" />
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

  return {
    columns: columns2,
    globalFilter,
    setGlobalFilter,
    convertComplexFilterToJsonLogic,
    globalFilterFn,
  };
}
