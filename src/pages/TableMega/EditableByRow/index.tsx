import { Section } from "~/components";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { useEditableByRow } from "./hooks";

export function TableMegaEditableByRowPage() {
  const { translate } = useTranslation();
  const { columns, data, handleFormSubmit } = useEditableByRow();

  return (
    <Section title={translate("EDITABLE_BY_ROW")} variant="h1">
      {translate("IMPLEMENTS_EDITABLE_MODE")}
      <form onSubmit={handleFormSubmit}>
        <TableMega.Root data={data} columns={columns}>
          <TableMega.Table>
            <TableMega.Thead />
            <TableMega.Tbody>
              <TableMega.Rows />
            </TableMega.Tbody>
          </TableMega.Table>
        </TableMega.Root>
      </form>
    </Section>
  );
}
