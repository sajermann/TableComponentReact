import { useEffect, useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import * as TableMega from "~/packages/TableMega";
import { TPerson } from "~/types";
import { delay, makeData } from "~/utils";
import { usePagination } from "../../hook";
import { Search } from "../Search";
// TODO: problemas
export function Backend() {
  const { translate } = useTranslation();
  const {
    pageCount,
    setPageCount,
    pagination,
    setPagination,
    filterQuery,
    setFilterQuery,
    backQuery,
  } = usePagination();
  const { columns } = useColumns();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TPerson[]>([]);
  async function load(query: string) {
    try {
      setIsLoading(true);
      if (query === "") return [];
      console.log(`batendo load`, { query });
      await delay(3000);
      const result = makeData.personWithPagination({
        pageSize: pagination.pageSize,
      });

      setPageCount(result.pageCount);
      setData(result.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load(backQuery);
  }, [backQuery]);

  return (
    <Section title={translate("PAGINATION_IN_BACKEND")} variant="h2">
      <div className="flex flex-col gap-2">
        <div>
          <strong>{translate("NOTE")}: </strong>
          <span>{translate("NOTE_PAGINATION_MODE")} </span>
          <span>{JSON.stringify({ backQuery })}</span>
        </div>
        <Search
          filterParams={filterQuery}
          setFilterParams={setFilterQuery}
          isLoading={isLoading}
        />

        {/* <Table
          isLoading={isLoading}
          columns={[...columns]}
          data={data || []}
          pagination={{
            pageCount,
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
            setPagination,
            disabledActions: isLoading,
          }}
        /> */}
        <TableMega.Root data={data} columns={columns}>
          <div className="max-h-100 overflow-auto">
            <TableMega.Table>
              <TableMega.Thead>
                <TableMega.LoadingBar show={isLoading} />
              </TableMega.Thead>
              <TableMega.Tbody>
                <TableMega.Rows />
              </TableMega.Tbody>
            </TableMega.Table>
          </div>
          <TableMega.Pagination.Controlled
            pageCount={pageCount}
            pageIndex={pagination.pageIndex}
            pageSize={pagination.pageSize}
            onPaginationChange={setPagination}
          />
        </TableMega.Root>
        <pre>{JSON.stringify({ pageCount, pagination })}</pre>
      </div>
    </Section>
  );
}
