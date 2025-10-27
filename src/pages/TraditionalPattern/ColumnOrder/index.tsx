import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { makeData } from "~/utils";
import { useColumnOrder } from "./hooks";

const DATA = makeData.person(50);

export function ColumnOrderPage() {
  const { translate } = useTranslation();
  const { columnOrder, columns } = useColumnOrder();

  return (
    <Section title={translate("COLUMNS_ORDER")} variant="h2">
      {translate("IMPLEMENTS_COLUMNS_ORDER_MODE")}
      <div>{translate("COLUMN_ORDER_WITH_STATE_FULLY_CONTROLLED")}</div>

      <Table
        columns={columns}
        data={DATA}
        columnOrder={columnOrder.map((item) => item.id)}
        maxHeight="70vh"
      />
    </Section>
  );
}
