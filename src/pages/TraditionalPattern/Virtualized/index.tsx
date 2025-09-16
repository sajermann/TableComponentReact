import { useState } from "react";
import { Button, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { makeData } from "~/utils";

const DATA = makeData.person(10000);

export function VirtualizedPage() {
  const { translate } = useTranslation();
  const [virtualized, setVirtualized] = useState(true);
  const { columns } = useColumns();

  return (
    <Section title={translate("VIRTUALIZED")} variant="h1">
      {translate("IMPLEMENTS_VIRTUALIZED_MODE")}

      <div className="flex flex-col gap-2">
        <Button
          variant="outlined"
          colorStyle="mono"
          onClick={() => setVirtualized((prev) => !prev)}
          className="w-44"
        >
          {translate(
            virtualized ? "DISABLED_VIRTUALIZATION" : "ACTIVE_VIRTUALIZATION"
          )}
        </Button>

        <Table
          columns={[...columns]}
          data={DATA}
          enableVirtualization={virtualized}
        />
      </div>
    </Section>
  );
}
