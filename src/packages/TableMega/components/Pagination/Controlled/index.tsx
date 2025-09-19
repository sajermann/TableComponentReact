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
};

export function Controlled({
  disabled,
  pageIndex,
  pageSize,
  onPaginationChange,
}: TPaginationProps) {
  const { table } = useTableMega();

  useEffect(() => {
    table.setState((prev) => ({
      ...prev,
      pagination: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    }));
    table.setOptions((prev) => ({
      ...prev,
      onPaginationChange,
      getPaginationRowModel: getPaginationRowModel(),
    }));
  }, [pageIndex, pageSize]);

  return <Main disabled={disabled} />;
}
