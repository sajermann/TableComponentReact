import { JSX } from "react";
import { Default, TDefaultProps } from "./Default";
import { Sort } from "./Sort";

type TheadComponent = ((props: TDefaultProps) => JSX.Element) & {
  Sort: typeof Sort;
  Default: typeof Default;
};

const Thead = ((props: TDefaultProps) => {
  return <Default {...props} />;
}) as TheadComponent;

Thead.Sort = Sort;
Thead.Default = Default;

export { Thead };
