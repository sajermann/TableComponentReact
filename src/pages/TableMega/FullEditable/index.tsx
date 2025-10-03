import { Button, JsonViewer, Section } from "~/components";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { useFullEditable } from "./hooks";

// TODO: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.

export function TableMegaFullEditablePage() {
  const { translate } = useTranslation();

  const { columns, data, handleFormSubmit } = useFullEditable();

  console.log({ columns, data, handleFormSubmit });
  return (
    <Section title={translate("FULL_EDITABLE")} variant="h1">
      <form onSubmit={handleFormSubmit}>
        <TableMega.Root data={data} columns={columns}>
          <div className="flex justify-between w-full mb-2">
            {translate("IMPLEMENTS_FULL_EDITABLE_MODE")}
            <Button colorStyle="mono" variant="outlined">
              {translate("SAVE")}
            </Button>
          </div>
          <TableMega.Table>
            <TableMega.Thead.Sort />
            <TableMega.Tbody>
              <TableMega.Rows />
            </TableMega.Tbody>
          </TableMega.Table>
        </TableMega.Root>
      </form>
      <div className="flex flex-col gap-2">
        <span className="text-sm italic">
          {translate("NOTE_UPDATED_AFTER_SAVE_SUBMIT")}
        </span>
        <JsonViewer value={data} />
      </div>
    </Section>
  );
}
