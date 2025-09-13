import { useEffect, useState } from "react";
import { Section } from "~/components";
import { useColumns, useLoaderAndConfig, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { UpdateRowExpanded } from "./components/UpdateRowExpanded";

export function ExpandedLinePage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>(makeData.person(5));
  const { columns } = useColumns();

  useLoaderAndConfig({
    from: "/traditional-pattern/expand-line",
  });

  return (
    <Section title={translate("EXPAND_LINE")} variant="h2">
      {translate("IMPLEMENTS_EXPAND_LINE_MODE")}

      <Table
        columns={columns}
        data={data}
        expandLine={{
          render: ({ original, getToggleExpandedHandler, index }) => (
            <UpdateRowExpanded
              dataToEdit={original}
              onSave={(dataUpdate) => {
                const updateData = [...data];
                updateData[index] = { ...updateData[index], ...dataUpdate };
                setData([...updateData]);
                getToggleExpandedHandler()();
              }}
              onCancel={getToggleExpandedHandler}
            />
          ),
        }}
      />
    </Section>
  );
}
