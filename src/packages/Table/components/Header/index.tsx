import { Table } from "@tanstack/react-table";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";
import { TDefTools } from "../../types";
import { TSearchProps } from "../../types/search.type";
import { ExportButtons } from "../ExportButtons";
import { Search } from "../Search";

type THeaderProps<T> = {
  searchProps: TSearchProps;
  table: Table<T>;
  tools?: TDefTools<T>;
};

export function Header<T>({ table, tools, searchProps }: THeaderProps<T>) {
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

      <ExportButtons
        containerProps={{
          className: managerClassNames(["flex gap-2 justify-end"], {
            "col-span-12 sm:col-span-6": searchProps && !searchProps.show,
            "col-span-12": !searchProps,
          }),
        }}
        table={table}
        tools={tools}
      />
    </div>
  );
}
