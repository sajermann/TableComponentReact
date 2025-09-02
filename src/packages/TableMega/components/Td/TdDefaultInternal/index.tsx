import { DetailedHTMLProps, TdHTMLAttributes } from "react";
import { managerClassNames } from "~/packages/TableMega/utils/managerClassNames";

export function TdDefaultInternal(
  props: DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
) {
  return (
    <td
      {...props}
      className={managerClassNames([
        "p-1.5 truncate",
        { [props.className as string]: !!props.className },
      ])}
    />
  );
}
