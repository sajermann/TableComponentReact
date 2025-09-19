import { useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
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
      <Table
        height="400px"
        columns={columns}
        data={DATA}
        pagination={{
          automatic: true,
          // automatic: {
          //   controlled: {
          //     pageIndex: paginationOnlyFront.pageIndex,
          //     pageSize: paginationOnlyFront.pageSize,
          //     onChange: setPaginationOnlyFront,
          //   },
          // },
        }}
      />
    </Section>
  );
}
