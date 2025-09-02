import { DetailedHTMLProps, TdHTMLAttributes } from "react";
import { TdDefaultInternal } from "./TdDefaultInternal";
import { TdWithEllipsis } from "./TdWithEllipsis";

type TTdProps = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export function Td({ ...rest }: TTdProps) {
  return !!rest?.title ? (
    <TdWithEllipsis {...rest} />
  ) : (
    <TdDefaultInternal {...rest} />
  );
}
