import {
  OnChangeFn,
  PaginationState,
  SortingState,
  Table,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "~/hooks/useTranslation";
import { useTableMega } from "../../../hooks";
import { Button } from "../../Button";
import { ContainerInput } from "../../ContainerInput";
import { Input } from "../../Input";
import { Label } from "../../Label";
import Select from "../../Select";

type TButtonPaginationProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

function ButtonPagination({
  children,
  onClick,
  disabled,
  ...rest
}: TButtonPaginationProps) {
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

type TMainProps = {
  disabled?: boolean;
};

export function Main({ disabled }: TMainProps) {
  const { translate } = useTranslation();
  const { table } = useTableMega();
  return (
    <div>
      <div className="h-2" />
      <div className="flex items-center gap-2 flex-wrap">
        <ButtonPagination
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage() || disabled}
        >
          <ChevronsLeftIcon color="#fff" />
        </ButtonPagination>
        <ButtonPagination
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || disabled}
        >
          <ChevronLeftIcon color="#fff" />
        </ButtonPagination>
        <ButtonPagination
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || disabled}
        >
          <ChevronRightIcon color="#fff" />
        </ButtonPagination>
        <ButtonPagination
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage() || disabled}
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
            disabled={disabled}
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

        {/* {pagination?.disabledPageSize && (
          <div>| {table.getRowModel().rows.length} Linhas</div>
        )} */}
        <ContainerInput className="w-max flex-row items-center">
          <Label htmlFor="isActive">{translate("ROWS")}</Label>
          <Select.Container>
            <Select.Select
              required
              id="isActive"
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
