import { DetailedHTMLProps, HTMLAttributes } from "react";
import { managerClassNames } from "~/utils";

type NoUpdatingDescriptionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export function NoUpdatingDescription({
  className,
  ...rest
}: NoUpdatingDescriptionProps) {
  return (
    <span
      {...rest}
      className={managerClassNames({
        [className as string]: className,
      })}
    />
  );
}
