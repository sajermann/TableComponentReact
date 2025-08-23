import { Row } from "@tanstack/react-table";
import { PenIcon, XIcon } from "lucide-react";

type Props<T> = {
  row: Row<T>;
};

export function Expander<T>({ row }: Props<T>) {
  return (
    <div className="w-full flex items-center justify-center">
      <button
        type="button"
        onClick={row.getToggleExpandedHandler()}
        className="dark:text-white text-black"
        {...{
          style: { cursor: "pointer" },
        }}
      >
        {row.getIsExpanded() ? <XIcon /> : <PenIcon />}
      </button>
    </div>
  );
}
