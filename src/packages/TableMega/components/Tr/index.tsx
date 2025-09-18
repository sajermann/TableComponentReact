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
  row: Row<T>;
  onClickRow?: ({ row }: { row: Row<T> }) => void;
};
export function Tr<T>({ row, onClickRow, ...rest }: Props<T>) {
  return (
    <tr
      {...rest}
      className={trVariant({
        className: rest.className,
      })}
      onClick={() => onClickRow?.({ row })}
    />
  );
}
