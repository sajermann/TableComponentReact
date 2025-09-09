import { RefObject, useEffect, useRef, useState } from "react";
import { Button, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

const DATA = makeData.person(10000);

export function TableMegaVirtualizationPage() {
  const { translate } = useTranslation();
  const [virtualized, setVirtualized] = useState(true);
  const { columns } = useColumns();
  const containerRef = useRef<HTMLDivElement>(null);
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

        {/* <Table
          isLoading={isLoading}
          columns={[...columns]}
          data={data}
          enableVirtualization={virtualized}
        /> */}
        <div ref={containerRef} className="h-200 overflow-auto">
          <TableMega.Root data={DATA} columns={columns}>
            <TableMega.Table>
              <TableMega.Thead.Sort />
              <TableMega.Tbody>
                {virtualized ? (
                  <TableMega.Rows.Virtualized containerRef={containerRef} />
                ) : (
                  <TableMega.Rows />
                )}
              </TableMega.Tbody>
            </TableMega.Table>
          </TableMega.Root>
        </div>
      </div>
    </Section>
  );
}
