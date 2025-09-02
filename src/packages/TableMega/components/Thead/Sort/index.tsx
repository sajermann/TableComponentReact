import {
  OnChangeFn,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { useTableMega } from "~/packages/TableMega/hooks";
import { THeadDefaultInternal } from "../THeadDefaultInternal";
import { ThWithSort } from "../ThWithSort";

type TSortProps = {
  controlled?: {
    sort: SortingState;
    setSort: OnChangeFn<SortingState>;
  };
};
export function Sort({ controlled }: TSortProps) {
  const { table } = useTableMega();

  useEffect(() => {
    if (!controlled) {
      table.setOptions((prev) => ({
        ...prev,
        getSortedRowModel: getSortedRowModel(),
      }));
      return;
    }

    if (controlled && controlled.sort) {
      table.setState((prev) => ({
        ...prev,
        sorting: controlled.sort,
      }));
      table.setOptions((prev) => ({
        ...prev,
        onSortingChange: controlled.setSort,
      }));
    }
  }, [controlled]);

  return (
    <THeadDefaultInternal>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <ThWithSort key={header.id} header={header} />
          ))}
        </tr>
      ))}
    </THeadDefaultInternal>
  );
}
