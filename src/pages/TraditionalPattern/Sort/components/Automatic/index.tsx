import { ColumnDef } from "@tanstack/react-table";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";

type TAutomaticProps = {
  columns: ColumnDef<TPerson>[];
  data: TPerson[];
};
export function Automatic({ columns, data }: TAutomaticProps) {
  const { translate } = useTranslation();

  return (
    <Section title={translate("AUTOMATIC_SORT")} variant="h2">
      {translate("NOTE_FOR_AUTOMATIC_SORT")}

      <Table columns={columns} data={data} />
    </Section>
  );
}
