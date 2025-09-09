import { Header } from "@tanstack/react-table";
import { useTableMega } from "~/packages/TableMega/hooks";

export function ResizingElement<T>({ header }: { header: Header<T, unknown> }) {
  const { table } = useTableMega();
  const { column } = header.getContext();
  const { meta } = column.columnDef;
  if (typeof meta?.resizingElement === "function") {
    return meta.resizingElement({ table, header });
  }
  return null;
}
