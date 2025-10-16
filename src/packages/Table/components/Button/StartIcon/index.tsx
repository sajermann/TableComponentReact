import { DetailedHTMLProps, HTMLAttributes } from "react";

type IStartIcon = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export function StartIcon({ ...rest }: IStartIcon) {
  if (rest.children) {
    return <div {...rest} />;
  }
  return null;
}
