import { useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { makeData } from "~/utils";
import { Selector } from "./components/Selector";

const DATA = makeData.person(10);

export function LoadingPage() {
  const { translate } = useTranslation();
  const [config, setConfig] = useState({
    withData: true,
    isLoading: false,
  });

  const { columns } = useColumns();

  return (
    <Section title={translate("LOADING")} variant="h1">
      {translate("IMPLEMENTS_LOADING_MODE")}

      <div className="flex flex-col gap-2">
        <Selector
          isLoading={config.isLoading}
          withData={config.withData}
          onChange={setConfig}
        />
        <Table
          isLoading={config.isLoading}
          columns={columns}
          data={config.withData ? DATA : []}
        />
      </div>
    </Section>
  );
}
