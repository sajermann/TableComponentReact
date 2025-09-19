import { useEffect, useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { delay, makeData } from "~/utils";
import { usePagination } from "../../hook";
import { Search } from "../Search";

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
    setIsLoading(true);
    if (query === "") return [];
    await delay(3000);
    const result = makeData.personWithPagination({
      pageSize: pagination.pageSize,
    });

    setPageCount(result.pageCount);
    setData(result.data);
    setIsLoading(false);
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

        <Table
          height="400px"
          isLoading={isLoading}
          columns={[...columns]}
          data={data || []}
          pagination={{
            disabledActions: isLoading,
            manual: {
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
              onChange: setPagination,
              pageCount: pageCount,
            },
          }}
        />
      </div>
    </Section>
  );
}
