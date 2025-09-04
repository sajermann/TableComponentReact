import { useTranslation } from "~/hooks/useTranslation";
import { useTableMega } from "../../../hooks";
import { TDefXml } from "../../../types/export.type";
import { exportTo, showInDevelopment } from "../../../utils";
import { Button } from "../../Button";
import { Icons } from "../../Icons";

type TXmlProps<T> = {
  defColumns: TDefXml<T>[];
};
export function Xml<T>({ defColumns }: TXmlProps<T>) {
  const { translate } = useTranslation();
  const { table } = useTableMega();
  const { rows } = table.getRowModel();

  return (
    <Button
      {...showInDevelopment({ "data-testid": "button-export-xml" })}
      variant="outlined"
      colorStyle="mono"
      onClick={() =>
        exportTo.xml({
          data: rows.map((item) => item.original),
          defColumns: defColumns,
        })
      }
      startIcon={<Icons nameIcon="xml" />}
      title={translate("EXPORT_TO_XML")}
      iconButton="squared"
    />
  );
}
