import { useTranslation } from "~/hooks/useTranslation";
import { useTableMega } from "../../../hooks";
import { TDefPrintPdfPng } from "../../../types/export.type";
import { exportTo, showInDevelopment } from "../../../utils";
import { Button } from "../../Button";
import { Icons } from "../../Icons";

type TPdfProps<T> = {
  defColumns: TDefPrintPdfPng<T>[];
};
export function Pdf<T>({ defColumns }: TPdfProps<T>) {
  const { translate } = useTranslation();
  const { table } = useTableMega();
  const { rows } = table.getRowModel();

  return (
    <Button
      {...showInDevelopment({ "data-testid": "button-export-pdf" })}
      variant="outlined"
      colorStyle="mono"
      onClick={() =>
        exportTo.pdf({
          data: rows.map((item) => item.original),
          defColumns: defColumns,
        })
      }
      title={translate("EXPORT_TO_PDF")}
      startIcon={<Icons nameIcon="pdf" />}
      iconButton="squared"
    />
  );
}
