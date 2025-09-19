import {
  OnChangeFn,
  PaginationState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { useTableMega } from "../../../hooks";
import { Main } from "../Main";

export type TPaginationAutomaticProps = {
  disabled?: boolean;
  pageIndex?: number;
  pageSize?: number;
  onPaginationChange?: OnChangeFn<PaginationState>;
};

export function Automatic({
  disabled,
  pageIndex = 0,
  pageSize = 10,
  onPaginationChange,
}: TPaginationAutomaticProps) {
  const { table } = useTableMega();

  useEffect(() => {
    if (typeof pageIndex === "number" && typeof pageSize === "number") {
      table.setState((prev) => ({
        ...prev,
        pagination: {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
      }));
    }

    table.setOptions((prev) => ({
      ...prev,
      ...(onPaginationChange ? { onPaginationChange } : {}),
      getPaginationRowModel: getPaginationRowModel(),
    }));
  }, [pageIndex, pageSize]);

  return <Main disabled={disabled} />;
}
