import { useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";
import { Selector } from "./components/Selector";

const DATA = makeData.person(10);

export function TableMegaLoadingPage() {
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

        <TableMega.Root data={config.withData ? DATA : []} columns={columns}>
          <TableMega.Table>
            <TableMega.Thead>
              <TableMega.LoadingBar show={config.isLoading} />
            </TableMega.Thead>
            <TableMega.Tbody>
              <TableMega.Rows />
            </TableMega.Tbody>
          </TableMega.Table>
        </TableMega.Root>
      </div>
    </Section>
  );
}
