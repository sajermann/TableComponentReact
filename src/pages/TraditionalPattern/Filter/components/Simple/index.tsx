import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";

import { makeData } from "~/utils";

const DATA = makeData.person(5);

export function Simple() {
  const { translate } = useTranslation();
  const { columns } = useColumns();

  return (
    <Section title={translate("SIMPLE")} variant="h2">
      <Table
        columns={columns}
        data={DATA}
        globalFilter={{
          showInput: true,
        }}
        // globalFilter={{
        //   filter: globalFilter,
        //   setFilter: setGlobalFilter,
        //   globalFilterFn: (row, columnId, filters) => {
        //     if (filters.length === 0) return true;

        //     return globalFilterFnCustom(row, columnId, filters);
        //   },
        //   disableInput: true,
        // }}
      />
    </Section>
  );
}
