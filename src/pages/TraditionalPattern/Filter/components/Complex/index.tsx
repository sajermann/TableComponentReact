import { Input, JsonViewer, Section } from "~/components";
import { SuperFilter } from "~/components/Filter";
import { useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { makeData } from "~/utils";
import { useComplex } from "./hooks";

const DATA = makeData.person(10);

export function Complex() {
  const { translate } = useTranslation();
  const { columns, globalFilter, setGlobalFilter, globalFilterFn } =
    useComplex();
  return (
    <Section title={translate("COMPLEX")} variant="h2">
      <div className="flex gap-2">
        <Input
          type="search"
          value={globalFilter.input}
          placeholder={translate("SEARCH_ON_EMAIL_AND_FRIENDS")}
          onChange={(e) =>
            setGlobalFilter((prev) => ({ ...prev, input: e.target.value }))
          }
        />
        <SuperFilter
          onChange={(e) => {
            setGlobalFilter((prev) => ({ ...prev, custom: e }));
          }}
        />
      </div>
      <Table
        columns={columns}
        data={DATA}
        globalFilter={{
          controlled: {
            filter: globalFilter,
            setFilter: setGlobalFilter,
            globalFilterFn: globalFilterFn,
          },
        }}
      />
      <JsonViewer value={globalFilter} />
    </Section>
  );
}
