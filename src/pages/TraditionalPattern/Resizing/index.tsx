import { Button, Section } from "~/components";
import { useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { makeData } from "~/utils";
import { useResizing } from "./hooks";

const DATA = makeData.person(5);

export function ResizingPage() {
  const { translate } = useTranslation();
  const { columns, handleReset, onResizing } = useResizing();

  return (
    <Section title={translate("RESIZING")} variant="h1">
      {translate("IMPLEMENTS_RESIZING_MODE")}
      <div className="flex flex-col gap-2">
        {translate("SAVE_COLUMN_SIZE_STATE_AFTER_ONE_SECOND_IN_LOCAL_STORAGE")}
        <div>
          <Button variant="outlined" colorStyle="mono" onClick={handleReset}>
            {translate("RESET")}
          </Button>
        </div>
        <Table columns={columns} data={DATA} onResizing={onResizing} />
      </div>
    </Section>
  );
}
