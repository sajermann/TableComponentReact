import { Table } from "@tanstack/react-table";
import { PrinterIcon } from "lucide-react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useTranslation } from "~/hooks/useTranslation";
import { TDefTools } from "../../types";
import { exportTo, showInDevelopment } from "../../utils";
import { Button } from "../Button";
import { Icons } from "../Icons";

type Props<T> = {
  table: Table<T>;
  tools?: TDefTools<T>;
  containerProps: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
};
export function ExportButtons<T>({ tools, table, containerProps }: Props<T>) {
  const { translate } = useTranslation();
  const { rows } = table.getRowModel();

  if (!tools) return null;

  return (
    <div {...containerProps}>
      {tools?.defForPrint && (
        <Button
          {...showInDevelopment({ "data-testid": "button-export-print" })}
          variant="outlined"
          colorStyle="mono"
          onClick={() =>
            exportTo.print({
              data: rows.map((item) => item.original),
              defColumns: tools?.defForPrint,
            })
          }
          title={translate("EXPORT_TO_PRINTER")}
          startIcon={<PrinterIcon />}
          iconButton="squared"
        />
      )}

      {tools?.defForPdf && (
        <Button
          {...showInDevelopment({ "data-testid": "button-export-pdf" })}
          variant="outlined"
          colorStyle="mono"
          onClick={() =>
            exportTo.pdf({
              data: rows.map((item) => item.original),
              defColumns: tools?.defForPdf,
            })
          }
          title={translate("EXPORT_TO_PDF")}
          startIcon={<Icons nameIcon="pdf" />}
          iconButton="squared"
        />
      )}

      {tools?.defForPng && (
        <Button
          {...showInDevelopment({ "data-testid": "button-export-png" })}
          variant="outlined"
          colorStyle="mono"
          onClick={() =>
            exportTo.png({
              data: rows.map((item) => item.original),
              defColumns: tools?.defForPng,
            })
          }
          title={translate("EXPORT_TO_PNG")}
          startIcon={<Icons nameIcon="png" />}
          iconButton="squared"
        />
      )}

      {tools?.defForExcel && (
        <Button
          {...showInDevelopment({ "data-testid": "button-export-excel" })}
          variant="outlined"
          colorStyle="mono"
          onClick={() =>
            exportTo.excel({
              data: rows.map((item) => item.original),
              defColumns: tools?.defForExcel,
            })
          }
          title={translate("EXPORT_TO_XLS")}
          startIcon={<Icons nameIcon="xls" />}
          iconButton="squared"
        />
      )}

      {tools?.defForCsv && (
        <Button
          {...showInDevelopment({ "data-testid": "button-export-csv" })}
          variant="outlined"
          colorStyle="mono"
          onClick={() =>
            exportTo.csv({
              data: rows.map((item) => item.original),
              defColumns: tools?.defForCsv,
              delimiter: ",",
            })
          }
          startIcon={<Icons nameIcon="csv" />}
          title={translate("EXPORT_TO_CSV")}
          iconButton="squared"
        />
      )}

      {tools?.defForXml && (
        <Button
          {...showInDevelopment({ "data-testid": "button-export-xml" })}
          variant="outlined"
          colorStyle="mono"
          onClick={() =>
            exportTo.xml({
              data: rows.map((item) => item.original),
              defColumns: tools?.defForXml,
            })
          }
          startIcon={<Icons nameIcon="xml" />}
          title={translate("EXPORT_TO_XML")}
          iconButton="squared"
        />
      )}
    </div>
  );
}
