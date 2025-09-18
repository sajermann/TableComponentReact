import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { makeData } from "~/utils";

const DATA = makeData.person(10);

export function DefaultPage() {
  const { translate } = useTranslation();
  const { columns } = useColumns();

  return (
    <Section title={translate("DEFAULT")} variant="h1">
      <Table data={DATA} columns={columns} />
    </Section>
  );
}
