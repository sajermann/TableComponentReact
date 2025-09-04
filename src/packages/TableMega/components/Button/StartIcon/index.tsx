import { DetailedHTMLProps, HTMLAttributes } from "react";
import { showInDevelopment } from "~/packages/Table/utils";

type IStartIcon = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export function StartIcon({ ...rest }: IStartIcon) {
  if (rest.children) {
    return (
      <div {...showInDevelopment({ "data-content": "startIcon" })} {...rest} />
    );
  }
  return null;
}
