import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "~/hooks/useTranslation";
import { Td } from "../Td";
import { Tr } from "../Tr";

type Props<T> = {
  data: T[];
  isLoading?: boolean;
  columns: ColumnDef<T>[];
};
export function NoData<T>({ data, isLoading, columns }: Props<T>) {
  const { translate } = useTranslation();

  if (data.length !== 0 || isLoading) {
    return null;
  }

  return (
    <Tr>
      <Td colSpan={Object.keys(columns).length}>{translate("NO_DATA")}</Td>
    </Tr>
  );
}
