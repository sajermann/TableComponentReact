import { useEffect, useMemo, useState } from "react";
import { Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TDefCsv, TDefPrintPdfPng, TDefXlsx, TPerson } from "~/types";
import { formatDate, makeData } from "~/utils";

export function ExportPage() {
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

  const defForExcel = useMemo<TDefXlsx<TPerson>[]>(
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
      <Table
        isLoading={isLoading}
        columns={columns}
        data={data}
        globalFilter={{
          filter: globalFilter,
          setFilter: setGlobalFilter,
        }}
        tools={{
          defForCsv: defForCsvAndXml,
          defForExcel,
          defForPrint: defForPrintAndPdfAndPng,
          defForPdf: defForPrintAndPdfAndPng,
          defForPng: defForPrintAndPdfAndPng,
          defForXml: defForCsvAndXml,
        }}
      />
    </Section>
  );
}
