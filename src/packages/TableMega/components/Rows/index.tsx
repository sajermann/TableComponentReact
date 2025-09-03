import { Default, TDefaultProps } from "./Default";
import { Virtualized } from "./Virtualized";

function Rows(props: TDefaultProps) {
  return <Default {...props} />;
}

Rows.Virtualized = Virtualized;
Rows.Default = Default;

export { Rows };
