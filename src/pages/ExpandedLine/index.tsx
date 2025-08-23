import { useEffect, useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";
import { UpdateRowExpanded } from "./components/UpdateRowExpanded";

export function ExpandedLinePage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { columns } = useColumns();

  useEffect(() => {
    setIsLoading(true);
    setData(makeData.person(20));
    setIsLoading(false);
  }, []);

  return (
    <Section title={translate("EXPAND_LINE")} variant="h2">
      {translate("IMPLEMENTS_EXPAND_LINE_MODE")}

      <Table
        isLoading={isLoading}
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
