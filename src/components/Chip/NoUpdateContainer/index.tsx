import { DetailedHTMLProps, HTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { ColorStyle, Variant } from "../types";

const buttonVariants = tv({
  base: [
    "flex items-center gap-2 w-max h-12 p-2 rounded",
    "bg-transparent border focus:ring-black text-white",
  ],
});

type NoUpdatingContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  variant?: Variant;
  colorStyle?: ColorStyle;
  invisible?: boolean;
};

export function NoUpdatingContainer({
  variant,
  colorStyle,
  className,
  ...rest
}: NoUpdatingContainerProps) {
  return (
    <div
      {...rest}
      className={buttonVariants({
        className: className,
      })}
    />
  );
}
