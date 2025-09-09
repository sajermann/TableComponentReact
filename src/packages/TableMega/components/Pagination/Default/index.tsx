import { OnChangeFn, PaginationState } from "@tanstack/react-table";
import { useEffect } from "react";
import { useTableMega } from "../../../hooks";
import { Main } from "../Main";

export type TPaginationDefaultProps = {
  disabled?: boolean;
  pageCount: number;
};

export function Default({ disabled, pageCount }: TPaginationDefaultProps) {
  const { table } = useTableMega();

  useEffect(() => {
    if (typeof pageCount === "number") {
      table.setOptions((prev) => ({
        ...prev,
        pageCount,
      }));
    }
  }, [pageCount]);

  return <Main disabled={disabled} />;
}
