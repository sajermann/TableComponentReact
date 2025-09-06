import {
  OnChangeFn,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import { useTableMega } from "~/packages/TableMega/hooks";
import { RowsWithSort } from "../RowsWithSort";
import { THeadDefaultInternal } from "../THeadDefaultInternal";
import { ThWithSort } from "../ThWithSort";

export type TSortProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
> & {
  controlled?: {
    sort: SortingState;
    setSort: OnChangeFn<SortingState>;
  };
  children?: React.ReactNode;
};
export function Sort({ controlled, children, ...rest }: TSortProps) {
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
    <THeadDefaultInternal {...rest}>
      <RowsWithSort />
      {children}
    </THeadDefaultInternal>
  );
}
