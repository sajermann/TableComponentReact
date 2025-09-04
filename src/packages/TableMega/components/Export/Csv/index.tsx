import { useTranslation } from "~/hooks/useTranslation";
import { useTableMega } from "../../../hooks";
import { TDefCsv } from "../../../types/export.type";
import { exportTo, showInDevelopment } from "../../../utils";
import { Button } from "../../Button";
import { Icons } from "../../Icons";

type TCsvProps<T> = {
  defColumns: TDefCsv<T>[];
};
export function Csv<T>({ defColumns }: TCsvProps<T>) {
  const { translate } = useTranslation();
  const { table } = useTableMega();
  const { rows } = table.getRowModel();

  return (
    <Button
      {...showInDevelopment({ "data-testid": "button-export-csv" })}
      variant="outlined"
      colorStyle="mono"
      onClick={() =>
        exportTo.csv({
          data: rows.map((item) => item.original),
          defColumns: defColumns,
        })
      }
      startIcon={<Icons nameIcon="csv" />}
      title={translate("EXPORT_TO_CSV")}
      iconButton="squared"
    />
  );
}
