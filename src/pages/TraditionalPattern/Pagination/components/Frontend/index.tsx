import { useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { makeData } from "~/utils";

export function Frontend() {
  const { translate } = useTranslation();
  const { columns } = useColumns();
  const [dataForFront] = useState(makeData.person(100));
  const [paginationOnlyFront, setPaginationOnlyFront] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <Section title={translate("PAGINATION_IN_FRONTEND")} variant="h2">
      <Table
        columns={[...columns]}
        data={dataForFront}
        pagination={{
          pageCount: dataForFront.length / paginationOnlyFront.pageSize,
          pageIndex: paginationOnlyFront.pageIndex,
          pageSize: paginationOnlyFront.pageSize,
          setPagination: setPaginationOnlyFront,
          automatic: true,
        }}
      />
    </Section>
  );
}
