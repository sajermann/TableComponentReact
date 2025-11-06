import jsonLogic from "json-logic-js";
import { Input, Section } from "~/components";
import { SuperFilter } from "~/components/Filter";
import { useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { makeData } from "~/utils";
import { useComplex } from "./hooks";

const DATA = makeData.person(10);

export function Complex() {
  const { translate } = useTranslation();
  const { columns, globalFilter, setGlobalFilter, globalFilterFn } =
    useComplex();
  return (
    <Section title={translate("COMPLEX")} variant="h2">
      <TableMega.Root
        data={DATA}
        columns={columns}
        globalFilter={{
          filter: globalFilter,
          onChange: setGlobalFilter,
          globalFilterFn,
        }}
      >
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
        <TableMega.Table>
          <TableMega.Thead.Sort />
          <TableMega.Tbody>
            <TableMega.Rows />
          </TableMega.Tbody>
        </TableMega.Table>
      </TableMega.Root>
    </Section>
  );
}
