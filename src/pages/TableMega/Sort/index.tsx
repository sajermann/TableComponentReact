import { Section } from "~/components";
import { makeData } from "~/utils";
import { Automatic, Disabled, Manual } from "./components";
import { useTableMegaSortPage } from "./hooks";

const DATA = makeData.person(5);

export function TableMegaSortPage() {
  const { columns } = useTableMegaSortPage();

  return (
    <Section
      title="Table Mega - Sort"
      variant="h1"
      className="flex flex-col gap-10"
    >
      <Automatic data={DATA} columns={columns} />
      <Manual data={DATA} columns={columns} />
      <Disabled data={DATA} columns={columns} />
    </Section>
  );
}
