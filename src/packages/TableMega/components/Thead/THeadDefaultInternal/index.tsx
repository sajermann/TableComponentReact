import { DetailedHTMLProps, HTMLAttributes } from "react";
import { managerClassNames } from "~/packages/TableMega/utils/managerClassNames";

export function THeadDefaultInternal(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
) {
  return (
    <thead
      {...props}
      className={managerClassNames([
        "m-0 top-0 sticky z-[1] backdrop-blur-md h-14",
        "shadow-lg shadow-black/25 dark:shadow-white/25",
      ])}
    />
  );
}
