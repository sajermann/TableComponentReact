import { JsonViewer, Section } from "~/components";
import { useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { useFullEditable } from "./hooks";

export function FullEditablePage() {
  const { translate } = useTranslation();
  const { columns, data } = useFullEditable();

  return (
    <Section title={translate("FULL_EDITABLE")} variant="h1">
      {translate("IMPLEMENTS_FULL_EDITABLE_MODE")}

      <Table columns={columns} data={data} />
      <span className="text-sm italic">
        {translate("NOTE_DATA_UPDATED_REAL_TIME")}
      </span>
      <JsonViewer value={data} />
    </Section>
  );
}
