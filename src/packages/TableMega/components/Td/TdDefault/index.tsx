import { DetailedHTMLProps, TdHTMLAttributes } from "react";
import { TdDefaultInternal } from "../TdDefaultInternal";

export function Default(
  props: DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
) {
  return <TdDefaultInternal {...props} />;
}
