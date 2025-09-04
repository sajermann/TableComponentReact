import { PrinterIcon } from "lucide-react";
import { useTranslation } from "~/hooks/useTranslation";
import { useTableMega } from "../../../hooks";
import { TDefPrintPdfPng } from "../../../types/export.type";
import { exportTo, showInDevelopment } from "../../../utils";
import { Button } from "../../Button";
import { Icons } from "../../Icons";

type TPngProps<T> = {
  defColumns: TDefPrintPdfPng<T>[];
};
export function Png<T>({ defColumns }: TPngProps<T>) {
  const { translate } = useTranslation();
  const { table } = useTableMega();
  const { rows } = table.getRowModel();

  return (
    <Button
      {...showInDevelopment({ "data-testid": "button-export-png" })}
      variant="outlined"
      colorStyle="mono"
      onClick={() =>
        exportTo.png({
          data: rows.map((item) => item.original),
          defColumns: defColumns,
        })
      }
      title={translate("EXPORT_TO_PNG")}
      startIcon={<Icons nameIcon="png" />}
      iconButton="squared"
    />
  );
}
