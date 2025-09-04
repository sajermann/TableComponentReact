import { useEffect, useMemo, useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import * as TableMega from "~/packages/TableMega";
import { TDefCsv, TDefPrintPdfPng, TDefXlsx, TPerson } from "~/types";
import { formatDate, makeData } from "~/utils";

// TODO: Colocar o filtro aqui para exportar com filtro - Nesse momento filtro global nao implementado

export function TableMegaExportPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");

  const { columns } = useColumns();

  async function load() {
    setIsLoading(true);
    setData(makeData.person(100));
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const headerStyles = {
    font: {
      patternType: "solid",
      color: { rgb: "FFFFFF" },
      bold: true,
    },
    fill: {
      patternType: "solid",
      fgColor: { rgb: "000" },
    },
  };

  const defForXls = useMemo<TDefXlsx<TPerson>[]>(
    () => [
      {
        header: "Id",
        styleHeaderCellFn: () => headerStyles,
        accessor: "id",
      },
      {
        header: translate("NAME"),
        styleHeaderCellFn: () => headerStyles,
        accessor: "name",
      },
      {
        header: translate("LAST_NAME"),
        styleHeaderCellFn: () => headerStyles,
        accessor: "lastName",
      },
      {
        header: translate("BIRTHDAY"),
        styleHeaderCellFn: () => headerStyles,
        accessor: "birthday",
        accessorFn: ({ valueCell }) =>
          formatDate(new Date(valueCell as string)),
      },
      {
        header: "Email",
        styleHeaderCellFn: () => headerStyles,
        accessor: "email",
      },
      {
        header: "Role",
        styleHeaderCellFn: () => headerStyles,
        accessor: "role",
      },
      {
        header: translate("ACTIVE"),
        styleHeaderCellFn: () => headerStyles,
        accessor: "isActive",
        accessorFn: ({ valueCell }) =>
          (valueCell as string) ? translate("YES") : translate("NO"),
        styleCellFn: ({ row }) => ({
          font: {
            patternType: "solid",
            color: { rgb: "FFFFFF" },
            bold: true,
          },
          fill: {
            patternType: "solid",
            fgColor: { rgb: row.isActive ? "228B22" : "DC143C" },
          },
        }),
      },
      {
        header: translate("FRIENDS"),
        styleHeaderCellFn: () => headerStyles,
        accessor: "friends",
        accessorFn: ({ valueCell }) =>
          (valueCell as { name: string }[])
            .map((item) => item.name)
            .join(" | "),
      },
    ],
    [translate]
  );

  const defForCsvAndXml = useMemo<TDefCsv<TPerson>[]>(
    () => [
      {
        header: "Id",
        accessor: "id",
      },
      {
        header: translate("NAME"),
        accessor: "name",
      },
      {
        header: translate("LAST_NAME"),
        accessor: "lastName",
      },
      {
        header: translate("BIRTHDAY"),
        accessor: "birthday",
        accessorFn: ({ valueCell }) =>
          formatDate(new Date(valueCell as string)),
      },
      {
        header: "Email",
        accessor: "email",
      },
      {
        header: "Role",
        accessor: "role",
      },
      {
        header: translate("ACTIVE"),
        accessor: "isActive",
        accessorFn: ({ valueCell }) =>
          (valueCell as string) ? translate("YES") : translate("NO"),
      },
      {
        header: translate("FRIENDS"),
        accessor: "friends",
        accessorFn: ({ valueCell }) =>
          (valueCell as { name: string }[])
            .map((item) => item.name)
            .join(" | "),
      },
    ],
    [translate]
  );

  const defForPrintAndPdfAndPng = useMemo<TDefPrintPdfPng<TPerson>[]>(
    () => [
      {
        header: "Id",
        accessor: "id",
      },
      {
        header: translate("NAME"),
        accessor: "name",
      },
      {
        header: translate("LAST_NAME"),
        accessor: "lastName",
      },
      {
        header: translate("BIRTHDAY"),
        accessor: "birthday",
        accessorFn: ({ valueCell }) =>
          formatDate(new Date(valueCell as string)),
        meta: {
          align: "center",
        },
      },
      {
        header: "Email",
        accessor: "email",
      },
      {
        header: "Role",
        accessor: "role",
        meta: {
          align: "center",
        },
      },
      {
        header: translate("ACTIVE"),
        accessor: "isActive",
        accessorFn: ({ valueCell }) =>
          (valueCell as string) ? translate("YES") : translate("NO"),
        meta: {
          align: "center",
        },
      },
      {
        header: translate("FRIENDS"),
        accessor: "friends",
        accessorFn: ({ valueCell }) =>
          (valueCell as { name: string }[])
            .map((item) => item.name)
            .join(" | "),
        cellRender: (dataT) => `
					<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 50%; height: 100%;">
						${dataT.valueCell}
					</div>
					`,
      },
    ],
    [translate]
  );

  return (
    <Section title={translate("EXPORT")} variant="h1">
      {translate("IMPLEMENTS_EXPORT_MODE")}
      <span className="text-xs">{translate("PDF_EXPORT_IS_BUGGED")}</span>

      <TableMega.Root data={data} columns={columns}>
        <div className="w-full flex gap-2 justify-end">
          <TableMega.Export.Printer defColumns={defForPrintAndPdfAndPng} />
          <TableMega.Export.Pdf defColumns={defForPrintAndPdfAndPng} />
          <TableMega.Export.Png defColumns={defForPrintAndPdfAndPng} />
          <TableMega.Export.Xls defColumns={defForXls} />
          <TableMega.Export.Csv defColumns={defForCsvAndXml} />
          <TableMega.Export.Xml defColumns={defForCsvAndXml} />
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
