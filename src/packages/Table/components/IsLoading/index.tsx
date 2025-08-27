import { ColumnDef, Row } from "@tanstack/react-table";
import { useTranslation } from "~/hooks/useTranslation";
import { TSelection } from "../../types";
import { countColSpan } from "../../utils";
import { LoadingBar } from "../LoadingBar";
import { Td } from "../Td";
import { Tr } from "../Tr";

type Props<T> = {
  selection?: Omit<TSelection<T>, "disableCheckbox">;
  data: T[];
  expandLine?: {
    render: (data: Row<T>) => React.ReactNode;
  };
  isLoading?: boolean;
  columns: ColumnDef<T>[];
};
export function IsLoading<T>({
  data,
  isLoading,
  expandLine,
  selection,
  columns,
}: Props<T>) {
  const { translate } = useTranslation();
  if (!isLoading) return null;
  return (
    <>
      <Tr className="!h-full">
        <Td
          colSpan={countColSpan({
            columns,
            expandLine,
            selection,
          })}
          style={{ padding: 0 }}
        >
          <LoadingBar show />
        </Td>
      </Tr>
      {data.length === 0 && (
        <Tr>
          <Td
            colSpan={countColSpan({
              columns,
              expandLine,
              selection,
            })}
            style={{ textAlign: "center" }}
          >
            {translate("LOADING")}...
          </Td>
        </Tr>
      )}
    </>
  );
}
