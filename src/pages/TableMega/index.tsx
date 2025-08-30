import { Section } from "~/components";
import { useColumns } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";

const data = makeData.person(50);

export function TableMegaPage() {
  const { columns } = useColumns();

  return (
    <Section title="Mega" variant="h1">
      Root
    </Section>
  );
}
