import { useEffect, useState } from "react";
import { JsonViewer, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { delay, makeData } from "~/utils";
import { usePagination } from "../../hook";
import { Search } from "../Search";

export function Backend() {
  const { translate } = useTranslation();
  const {
    rowCount,
    setRowCount,
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
      await delay(3000);
      const result = makeData.personWithPagination({
        pageSize: pagination.pageSize,
      });
      setData(result.data);
      setRowCount(result.rowCount);
    } catch (error) {
      console.log(`Error on Backend`, error);
      setData([]);
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
        </div>
        <Search
          filterParams={filterQuery}
          setFilterParams={setFilterQuery}
          isLoading={isLoading}
        />

        <Table
          height="400px"
          isLoading={isLoading}
          columns={columns.slice(1)}
          data={data || []}
          pagination={{
            disabledActions: isLoading,
            manual: {
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
              onChange: setPagination,
              rowCount: rowCount,
            },
          }}
        />
        <JsonViewer
          value={{
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
            rowCount,
            backQuery,
          }}
        />
      </div>
    </Section>
  );
}
