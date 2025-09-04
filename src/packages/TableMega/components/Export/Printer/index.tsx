import { PrinterIcon } from "lucide-react";
import { useTranslation } from "~/hooks/useTranslation";
import { useTableMega } from "../../../hooks";
import { TDefPrintPdfPng } from "../../../types/export.type";
import { exportTo, showInDevelopment } from "../../../utils";
import { Button } from "../../Button";

type TPrinterProps<T> = {
  defColumns: TDefPrintPdfPng<T>[];
};
export function Printer<T>({ defColumns }: TPrinterProps<T>) {
  const { translate } = useTranslation();
  const { table } = useTableMega();
  const { rows } = table.getRowModel();

  return (
    <Button
      {...showInDevelopment({ "data-testid": "button-export-printer" })}
      variant="outlined"
      colorStyle="mono"
      onClick={() =>
        exportTo.print({
          data: rows.map((item) => item.original),
          defColumns: defColumns,
        })
      }
      title={translate("EXPORT_TO_PRINTER")}
      startIcon={<PrinterIcon />}
      iconButton="squared"
    />
  );
}
