import { FilterFnOption, getFilteredRowModel } from "@tanstack/react-table";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "~/hooks/useTranslation";
import { useTableMega } from "~/packages/TableMega/hooks";
import { Input } from "../../Input";

type TInputProps<T> = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  controlled?: {
    filter: string;
    setFilter: (data: string) => void;
  };
  globalFilterFn?: FilterFnOption<T>;
};

export function SearchInput<T>({
  controlled,
  globalFilterFn,
  ...rest
}: TInputProps<T>) {
  const { translate } = useTranslation();
  const { table } = useTableMega();
  const [filter, setFilter] = useState("");

  const filterInternal = controlled?.filter ? controlled.filter : filter;
  const setFilterInternal = controlled?.setFilter
    ? controlled.setFilter
    : setFilter;

  useEffect(() => {
    table.setOptions((prev) => ({
      ...prev,
      onGlobalFilterChange: controlled?.setFilter
        ? controlled.setFilter
        : setFilter,
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: globalFilterFn || "auto",
    }));

    table.setState((prev) => ({
      ...prev,
      globalFilter: filterInternal,
    }));
  }, [filterInternal, setFilterInternal]);

  return (
    <Input
      value={filterInternal}
      onChange={(e) => setFilterInternal(e.target.value)}
      placeholder={translate("SEARCH")}
      type="search"
      {...rest}
    />
  );
}
