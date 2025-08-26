import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { tv } from "tailwind-variants";

import { CheckIcon, XIcon } from "lucide-react";
import { ColorStyle, Variant } from "../types";

const actionButtonVariants = tv({
  base: "h-5 w-5 z-[1] transition-all duration-500 hover:opacity-70",
});

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  show: boolean;
  icon: "checked" | "close";
  variant?: Variant;
  colorStyle?: ColorStyle;
};
export function ActionButton({
  onClick,
  show,
  icon,
  variant,
  colorStyle,
  className,
  ...rest
}: Props) {
  if (!show) return null;
  const iconIternal = {
    checked: <CheckIcon className="w-full h-full" />,
    close: <XIcon className="w-full h-full" />,
  };
  return (
    <button
      {...rest}
      type="button"
      className={actionButtonVariants({
        className,
      })}
      onClick={onClick}
    >
      {iconIternal[icon]}
    </button>
  );
}
