import { Row } from "@tanstack/react-table";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { tv } from "tailwind-variants";

import { TSelection } from "../../types";
import { onClickRow } from "../../utils";

const trVariant = tv({
  base: "h-17 max-h-17 min-h-17",
});

type Props<T> = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
> & {
  row?: Row<T>;
  selection?: Omit<TSelection<T>, "disableCheckbox">;
};
export function Tr<T>({ row, selection, ...rest }: Props<T>) {
  return (
    <tr
      {...rest}
      className={trVariant({
        className: rest.className,
      })}
      onClick={() => onClickRow({ row, selection })}
    />
  );
}
