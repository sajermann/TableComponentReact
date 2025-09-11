import { useEffect, useState } from "react";
import { Button, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

export function VirtualizedPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [virtualized, setVirtualized] = useState(true);
  const { columns } = useColumns();

  async function load() {
    setIsLoading(true);
    setData(makeData.person(2000));
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

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
          isLoading={isLoading}
          columns={[...columns]}
          data={data}
          enableVirtualization={virtualized}
        />
      </div>
    </Section>
  );
}
