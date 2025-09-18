import { Row } from "@tanstack/react-table";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { tv } from "tailwind-variants";

const trVariant = tv({
  base: "h-17 max-h-17 min-h-17",
});

type Props<T> = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
> & {
  row?: Row<T>;
};
export function Tr<T>({ row, children, ...rest }: Props<T>) {
  return (
    <tr
      {...rest}
      className={trVariant({
        className: rest.className,
      })}
      // onClick={() => onClickRow({ row, selection })}
    >
      {children}
    </tr>
  );
}
