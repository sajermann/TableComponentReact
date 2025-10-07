import { Section } from "~/components";
import { useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { useEditableByRow } from "./hooks";

export function TraditionalEditableByRowPage() {
  const { translate } = useTranslation();
  const { columns, data, handleFormSubmit } = useEditableByRow();

  return (
    <Section title={translate("EDITABLE_BY_ROW")} variant="h1">
      {translate("IMPLEMENTS_EDITABLE_MODE")}
      <form onSubmit={handleFormSubmit}>
        <Table columns={columns} data={data} />
      </form>
    </Section>
  );
}
