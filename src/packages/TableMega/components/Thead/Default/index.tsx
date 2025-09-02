import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useTableMega } from "~/packages/TableMega/hooks";
import { THeadDefaultInternal } from "../THeadDefaultInternal";
import { ThWithoutSort } from "../ThWithoutSort";

export type TDefaultProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;
export function Default(props: TDefaultProps) {
  const { table } = useTableMega();

  return (
    <THeadDefaultInternal {...props}>
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
