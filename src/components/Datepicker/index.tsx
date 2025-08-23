import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { managerClassNames } from "~/utils";
import { Input } from "../Input";

export function Datepicker(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return (
    <Input
      {...props}
      type="date"
      className="dark:[color-scheme:dark]"
      // className={managerClassNames([
      //   "dark:bg-neutral-900 border border-neutral-700",
      //   "dark:text-gray-100 rounded-lg px-3 py-2",
      //   "focus:outline-none focus:ring-2 focus:ring-indigo-500",
      //   "transition shadow-sm w-full placeholder-gray-500",
      //   "dark:[color-scheme:dark]",
      // ])}
    />
  );
}
