import { ColumnVisibilitySelector } from "~/components/ColumnVisibilitySelector";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";
import { useColumnVisibility } from "./hooks";

const DATA = makeData.person(5);

export function TableMegaColumnVisibilityPage() {
  const { translate } = useTranslation();
  const { columnVisibility, columns, handleCheck, options } =
    useColumnVisibility();

  return (
    <Section title={translate("COLUMN_VISIBILITY")} variant="h1">
      {translate("IMPLEMENTS_COLUMN_VISIBILITY_MODE")}
      <div className="flex flex-col gap-2">
        {translate("COLUMN_VISIBILITY_WITH_STATE_FULLY_CONTROLLED")}
        <div className="flex flex-col gap-2">
          <ColumnVisibilitySelector
            options={options}
            handleCheck={handleCheck}
          />
          <TableMega.Root
            data={DATA}
            columns={columns}
            columnVisibility={columnVisibility}
          >
            <TableMega.Table>
              <TableMega.Thead />
              <TableMega.Tbody>
                <TableMega.Rows />
              </TableMega.Tbody>
            </TableMega.Table>
          </TableMega.Root>
        </div>
      </div>
    </Section>
  );
}
