import { Header } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const config = {
  asc: <ChevronUpIcon className="w-5" />,
  desc: <ChevronDownIcon className="w-5" />,
};

export function SortIcon<T>({ header }: { header: Header<T, unknown> }) {
  const opt = header.column.getIsSorted() as "asc" | "desc";
  if (!opt) return null;
  return config[opt];
}
