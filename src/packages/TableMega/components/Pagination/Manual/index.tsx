import {
  OnChangeFn,
  PaginationState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { useTableMega } from "../../../hooks";
import { Main } from "../Main";

type TPaginationProps = {
  disabled?: boolean;
  pageIndex: number;
  pageSize: number;
  onPaginationChange: OnChangeFn<PaginationState>;
  rowCount: number;
};

export function Manual({
  disabled,
  pageIndex,
  pageSize,
  onPaginationChange,
  rowCount,
}: TPaginationProps) {
  const { table } = useTableMega();

  useEffect(() => {
    table.setState((prev) => ({
      ...prev,
      pagination: {
        pageIndex,
        pageSize,
      },
    }));
    table.setOptions((prev) => ({
      ...prev,
      onPaginationChange,
      rowCount,
      manualPagination: true,
    }));
  }, [pageIndex, pageSize, rowCount]);

  return <Main disabled={disabled} />;
}
