import { useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";

const DATA = makeData.person(100);

export function Frontend() {
  const { translate } = useTranslation();
  const { columns } = useColumns();
  const [paginationOnlyFront, setPaginationOnlyFront] = useState({
    pageIndex: 2,
    pageSize: 20,
  });

  return (
    <Section title={translate("PAGINATION_IN_FRONTEND")} variant="h2">
      <TableMega.Root data={DATA} columns={columns}>
        <div className="max-h-100 overflow-auto">
          <TableMega.Table>
            <TableMega.Thead />

            <TableMega.Tbody>
              <TableMega.Rows />
            </TableMega.Tbody>
          </TableMega.Table>
        </div>
        <TableMega.Pagination.Automatic
        // onPaginationChange={setPaginationOnlyFront}
        // pageIndex={paginationOnlyFront.pageIndex}
        // pageSize={paginationOnlyFront.pageSize}
        />
      </TableMega.Root>
    </Section>
  );
}
