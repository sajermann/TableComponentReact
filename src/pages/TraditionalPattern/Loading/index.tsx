import { useEffect, useState } from "react";
import { Button, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

export function LoadingPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { columns } = useColumns();

  async function load() {
    setIsLoading(true);
    setData(makeData.person(1000));
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function handleLoading(withData?: boolean) {
    setData(withData ? makeData.person(1000) : []);
    setIsLoading(true);
  }

  return (
    <Section title={translate("LOADING")} variant="h1">
      {translate("IMPLEMENTS_LOADING_MODE")}

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            variant="outlined"
            colorStyle="mono"
            onClick={() => handleLoading(true)}
          >
            {translate("LOADING_WITH_DATA")}
          </Button>
          <Button
            variant="outlined"
            colorStyle="mono"
            onClick={() => handleLoading()}
          >
            {translate("LOADING_WITHOUT_DATA")}
          </Button>

          <Button variant="outlined" colorStyle="mono" onClick={() => load()}>
            {translate("NORMAL_STATE")}
          </Button>
        </div>
        <Table isLoading={isLoading} columns={columns} data={data} />
      </div>
    </Section>
  );
}
