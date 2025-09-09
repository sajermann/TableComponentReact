import { OnChangeFn, PaginationState } from "@tanstack/react-table";
import { useEffect } from "react";
import { useTableMega } from "../../../hooks";
import { Main } from "../Main";

type TPaginationProps = {
  disabled?: boolean;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  onPaginationChange: OnChangeFn<PaginationState>;
};

export function Controlled({
  disabled,
  pageCount,
  pageIndex,
  pageSize,
  onPaginationChange,
}: TPaginationProps) {
  const { table } = useTableMega();

  useEffect(() => {
    let options = {};
    if (typeof pageCount === "number") {
      options = {
        ...options,
        pageCount,
      };
    }

    console.log(`controlled`, { pageCount, pageIndex });
    table.setState((prev) => ({
      ...prev,
      pagination: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    }));
    table.setOptions((prev) => ({
      ...prev,
      ...options,
      onPaginationChange,
    }));
  }, [pageCount, pageIndex, pageSize]);

  return <Main disabled={disabled} />;
}
