/* eslint-disable react/button-has-type */

import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useTranslation } from "~/hooks/useTranslation";
import { Button } from "../Button";
import { ContainerInput } from "../ContainerInput";
import { Input } from "../Input";
import { Label } from "../Label";
//import { Select } from "../Select";

type Props<T> = {
  table: Table<T>;
  pagination?: {
    disabledActions?: boolean;
    disabledPageSize?: boolean;
  };
  propsButtonFirstPage?: Record<string, unknown>;
  propsButtonPrevPage?: Record<string, unknown>;
  propsButtonNextPage?: Record<string, unknown>;
  propsButtonLastPage?: Record<string, unknown>;
  propsInput?: Record<string, unknown>;
};

type PropsButtonPagination = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

function ButtonPagination({
  children,
  onClick,
  disabled,
  ...rest
}: PropsButtonPagination) {
  return (
    <Button
      iconButton="squared"
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
}

const DEFAULT_OPTIONS = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
];

export function Pagination<T>({
  table,
  pagination,
  // disabledActions,
  // disabledPageSize,
  propsButtonFirstPage,
  propsButtonPrevPage,
  propsButtonNextPage,
  propsButtonLastPage,
  propsInput,
}: Props<T>) {
  const { translate } = useTranslation();
  if (!pagination) return null;
  return (
    <div>
      <div className="h-2" />
      <div className="flex items-center gap-2 flex-wrap">
        <ButtonPagination
          {...propsButtonFirstPage}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage() || pagination?.disabledActions}
        >
          <ChevronsLeftIcon color="#fff" />
        </ButtonPagination>
        <ButtonPagination
          {...propsButtonPrevPage}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || pagination?.disabledActions}
        >
          <ChevronLeftIcon color="#fff" />
        </ButtonPagination>
        <ButtonPagination
          {...propsButtonNextPage}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || pagination?.disabledActions}
        >
          <ChevronRightIcon color="#fff" />
        </ButtonPagination>
        <ButtonPagination
          {...propsButtonLastPage}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage() || pagination?.disabledActions}
        >
          <ChevronsRightIcon color="#fff" />
        </ButtonPagination>
        <span className="flex items-center gap-1">
          <span>{translate("PAGE")}</span>
          <strong>{table.getState().pagination.pageIndex + 1}</strong>
          <span>{translate("OF")}</span> <strong>{table.getPageCount()}</strong>
        </span>
        <ContainerInput className="w-max flex-row items-center">
          <Label className="whitespace-nowrap" htmlFor="pageNumber">
            {translate("GO_TO_PAGE")}
          </Label>
          <Input
            {...propsInput}
            disabled={pagination?.disabledActions}
            type="number"
            id="pageNumber"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onBlur={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            min={1}
            max={table.getPageCount()}
          />
        </ContainerInput>

        {pagination?.disabledPageSize && (
          <div>| {table.getRowModel().rows.length} Linhas</div>
        )}
        {!pagination?.disabledPageSize && (
          <ContainerInput className="w-max flex-row items-center">
            <Label htmlFor="isActive">{translate("ROWS")}</Label>
            {/* <Select
              menuPosition="fixed"
              isSearchable={false}
              isDisabled={pagination?.disabledActions}
              value={DEFAULT_OPTIONS.find(
                (item) => item.value === table.getState().pagination.pageSize
              )}
              options={DEFAULT_OPTIONS}
              onChange={(e: { value: string }) => {
                table.setPageSize(Number(e?.value));
              }}
              id="isActive"
            /> */}
          </ContainerInput>
        )}
      </div>
    </div>
  );
}
