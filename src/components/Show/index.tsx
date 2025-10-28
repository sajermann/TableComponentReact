import { ReactNode } from "react";

export function Show({
  children,
  condition,
}: {
  children: ReactNode;
  condition?: boolean;
}) {
  return condition ? children : null;
}
