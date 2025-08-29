import { Row } from "@tanstack/react-table";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { managerClassNames } from "~/packages/Table/utils/managerClassNames";

import { TSelection } from "../../types";
import { onClickRow } from "../../utils";
import styles from "./index.module.css";

type Props<T> = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
> & {
  row?: Row<T>;
  selection?: Omit<TSelection<T>, "disableCheckbox">;
  expandLine?: {
    render: (data: Row<T>) => React.ReactNode;
  };
};
export function Tr<T>({
  row,
  children,
  selection,
  expandLine,
  ...rest
}: Props<T>) {
  return (
    <tr
      {...rest}
      className={managerClassNames([
        "h-17 max-h-17 min-h-17",
        {
          "border-2 border-b-0 border-gray-200 !bg-green-500 text-black":
            expandLine && row && row.getIsExpanded(),
        },
        { [rest.className as string]: rest.className },
      ])}
      onClick={() => onClickRow({ row, selection })}
    >
      {children}
    </tr>
  );
}
