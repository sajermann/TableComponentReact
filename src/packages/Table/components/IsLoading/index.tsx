import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "~/hooks/useTranslation";
import { LoadingBar } from "../LoadingBar";
import { Td } from "../Td";
import { Tr } from "../Tr";

type Props<T> = {
  data: T[];
  isLoading?: boolean;
  columns: ColumnDef<T>[];
};
export function IsLoading<T>({ data, isLoading, columns }: Props<T>) {
  const { translate } = useTranslation();
  if (!isLoading) return null;

  const colSpan = Object.keys(columns).length;
  return (
    <>
      <Tr className="!h-full">
        <Td colSpan={colSpan} style={{ padding: 0 }}>
          <LoadingBar show />
        </Td>
      </Tr>
      {data.length === 0 && (
        <Tr>
          <Td colSpan={colSpan} style={{ textAlign: "center" }}>
            {translate("LOADING")}...
          </Td>
        </Tr>
      )}
    </>
  );
}
