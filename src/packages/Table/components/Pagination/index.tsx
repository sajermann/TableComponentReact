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
import Select from "../Select";

//import { Select } from "../Select";

type Props<T> = {
  table: Table<T>;
  pagination?: {
    disabledActions?: boolean;
  };
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
      variant="outlined"
      colorStyle="mono"
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

export function Pagination<T>({ table, pagination }: Props<T>) {
  const { translate } = useTranslation();
  if (!pagination) return null;
  return (
    <div>
      <div className="h-2" />
      <div className="flex items-center gap-2 flex-wrap">
        <ButtonPagination
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage() || pagination?.disabledActions}
        >
          <ChevronsLeftIcon />
        </ButtonPagination>
        <ButtonPagination
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || pagination?.disabledActions}
        >
          <ChevronLeftIcon />
        </ButtonPagination>
        <ButtonPagination
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || pagination?.disabledActions}
        >
          <ChevronRightIcon />
        </ButtonPagination>
        <ButtonPagination
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage() || pagination?.disabledActions}
        >
          <ChevronsRightIcon />
        </ButtonPagination>
        <span className="flex items-center gap-1">
          <span>{translate("PAGE")}</span>
          <strong>
            {Math.ceil(table.getState().pagination.pageIndex + 1)}
          </strong>
          <span>{translate("OF")}</span>{" "}
          <strong>{Math.ceil(table.getPageCount())}</strong>
        </span>

        <ContainerInput className="w-max flex-row items-center">
          <Label htmlFor="rows">{translate("ROWS")}</Label>
          <Select.Container>
            <Select.Select
              disabled={pagination.disabledActions}
              required
              id="rows"
              onChange={({ target }) =>
                table.setPageSize(Number(target?.value))
              }
              value={
                DEFAULT_OPTIONS.find(
                  (item) => item.value === table.getState().pagination.pageSize
                )?.value
              }
            >
              {DEFAULT_OPTIONS.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select.Select>
            <Select.Arrow />
          </Select.Container>
        </ContainerInput>
      </div>
    </div>
  );
}
