import { Table } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";
import { TDefTools } from "../../types";
import { TGlobalFilter } from "../../types/global-filter.type";
import { TSearchProps } from "../../types/search.type";
import { ExportButtons } from "../ExportButtons";
import { Search } from "../Search";

type THeaderProps<T> = {
  searchProps: TSearchProps;
  table: Table<T>;
  tools?: TDefTools<T>;
};

export function Header<T>({ table, tools, searchProps }: THeaderProps<T>) {
  console.log({ searchProps, tools });
  if (!tools && (!searchProps || !searchProps?.show)) return null;
  return (
    <div className="grid grid-cols-12 gap-2 w-full mb-1 items-center">
      <Search
        className={managerClassNames({
          "col-span-12 sm:col-span-6": !!tools,
          "col-span-12": !!!tools,
        })}
        {...searchProps}
      />

      {/* 
      <div
        className={managerClassNames({
          "col-span-12 sm:col-span-6":
            globalFilter && !globalFilter.disableInput,
          "col-span-12": !globalFilter,
        })}
      >
        <ExportButtons table={table} tools={tools} />
      </div> */}
    </div>
  );
}
