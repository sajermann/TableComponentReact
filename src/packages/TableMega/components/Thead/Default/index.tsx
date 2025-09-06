import { DetailedHTMLProps, HTMLAttributes } from "react";
import { RowsWithoutSort } from "../RowsWithoutSort";
import { THeadDefaultInternal } from "../THeadDefaultInternal";

export type TDefaultProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;
export function Default({ children, ...rest }: TDefaultProps) {
  return (
    <THeadDefaultInternal {...rest}>
      <RowsWithoutSort />
      {children}
    </THeadDefaultInternal>
  );
}
