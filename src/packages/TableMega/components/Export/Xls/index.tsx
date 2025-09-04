import { useTranslation } from "~/hooks/useTranslation";
import { useTableMega } from "../../../hooks";
import { TDefXlsx } from "../../../types/export.type";
import { exportTo, showInDevelopment } from "../../../utils";
import { Button } from "../../Button";
import { Icons } from "../../Icons";

type TXlsProps<T> = {
  defColumns: TDefXlsx<T>[];
};
export function Xls<T>({ defColumns }: TXlsProps<T>) {
  const { translate } = useTranslation();
  const { table } = useTableMega();
  const { rows } = table.getRowModel();

  return (
    <Button
      {...showInDevelopment({ "data-testid": "button-export-xls" })}
      variant="outlined"
      colorStyle="mono"
      onClick={() =>
        exportTo.xls({
          data: rows.map((item) => item.original),
          defColumns: defColumns,
        })
      }
      title={translate("EXPORT_TO_XLS")}
      startIcon={<Icons nameIcon="xls" />}
      iconButton="squared"
    />
  );
}
