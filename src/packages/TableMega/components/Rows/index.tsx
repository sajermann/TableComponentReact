import { RowsDefault, TRowsDefaultProps } from "./RowsDefault";
import { RowsVirtualized } from "./RowsVirtualized";

function Rows<T>(props: TRowsDefaultProps<T>) {
  return <RowsDefault {...props} />;
}

Rows.Virtualized = RowsVirtualized;
Rows.Default = RowsDefault;

export { Rows };
