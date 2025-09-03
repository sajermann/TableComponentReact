import { DetailedHTMLProps, HTMLAttributes } from "react";

import { useDarkMode } from "~/hooks/useDarkMode";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";

type TTbodyProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
> & {
  isLoading?: boolean;
};

export function Tbody({ isLoading, ...rest }: TTbodyProps) {
  const { darkMode } = useDarkMode();

  return (
    <tbody
      {...rest}
      className={managerClassNames({
        "[&>*:nth-child(odd)]:bg-dark-600": darkMode,
        "[&>*:nth-child(odd)]:bg-[#f2f2f2]": !darkMode,
        "opacity-5": isLoading,
        "opacity-100": !isLoading,
        [rest.className as string]: !!rest.className,
      })}
    />
  );
}
