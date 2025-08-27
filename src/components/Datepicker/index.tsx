import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Input } from "../Input";

export function Datepicker(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return <Input {...props} type="date" className="dark:[color-scheme:dark]" />;
}
