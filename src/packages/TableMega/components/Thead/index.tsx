import {
  Header,
  OnChangeFn,
  SortingState,
  Table,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { managerClassNames } from "~/utils";
import { useTableMega } from "../../hooks";
import { Filter } from "./Filter";
import { Resizing } from "./Resizing";
import { SortIcon } from "./SortIcon";

function THeadDefaultInternal(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
) {
  return (
    <thead
      {...props}
      className={managerClassNames([
        "m-0 top-0 sticky z-[1] backdrop-blur-md h-14",
        "shadow-lg shadow-black/25 dark:shadow-white/25",
      ])}
    />
  );
}

function ThWithoutSort<T>({ header }: { header: Header<T, unknown> }) {
  return (
    <th
      className={managerClassNames([
        "p-4 relative ",
        {
          "text-left": !header.getContext().column.columnDef.meta?.align,
          "text-center":
            header.getContext().column.columnDef.meta?.align === "center",
          "text-right":
            header.getContext().column.columnDef.meta?.align === "right",
        },
      ])}
      key={header.id}
      colSpan={header.colSpan}
      style={{
        width: header.getSize(),
      }}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  );
}
function ThWithSort<T>({ header }: { header: Header<T, unknown> }) {
  if (!header.column.getCanSort()) {
    return <ThWithoutSort header={header} />;
  }
  return (
    <th
      className="p-4"
      key={header.id}
      colSpan={header.colSpan}
      style={{
        width: header.getSize(),
      }}
    >
      {header.isPlaceholder ? null : (
        <button
          type="button"
          className={managerClassNames([
            "flex items-center gap-2 w-full",
            {
              "justify-center":
                header.getContext().column.columnDef.meta?.align === "center",
              "justify-right":
                header.getContext().column.columnDef.meta?.align === "right",
              "cursor-pointer select-none": header.column.getCanSort(),
            },
          ])}
          onClick={header.column.getToggleSortingHandler()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          <SortIcon header={header} />
        </button>
      )}
    </th>
  );
}

export function Default() {
  const { table } = useTableMega();

  return (
    <THeadDefaultInternal>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <ThWithoutSort key={header.id} header={header} />
          ))}
        </tr>
      ))}
    </THeadDefaultInternal>
  );
}

type TSortProps<T> = {
  controlled?: {
    sort: SortingState;
    setSort: Dispatch<SetStateAction<SortingState>>;
  };
};

export function Sort<T>({ controlled }: TSortProps<T>) {
  const { table } = useTableMega({
    enableSorting: true,
    controlledSort: controlled,
  });
  return (
    <THeadDefaultInternal>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <ThWithSort key={header.id} header={header} />
          ))}
        </tr>
      ))}
    </THeadDefaultInternal>
  );
}

export const Thead = {
  Default: Default,
  Sort: Sort,
};
