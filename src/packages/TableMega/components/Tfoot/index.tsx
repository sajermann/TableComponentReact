import { flexRender } from "@tanstack/react-table";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";
import { useTableMega } from "../../hooks";

type TTfootProps<T> = {};

export function Tfoot<T>({}: TTfootProps<T>) {
  const { table } = useTableMega();
  return (
    <tfoot
      className={managerClassNames({
        "m-0 bottom-0 sticky z-[1] backdrop-blur-md h-14": true,
        "shadow-table-top-lg shadow-black/25 dark:shadow-white/25": true,
      })}
    >
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{
                textAlign: header.getContext().column.columnDef.meta?.align,
              }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </tfoot>
  );
}
