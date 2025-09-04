import { Default as DefaultInternal, TDefaultProps } from "./Default";
import { Expand } from "./Expand";

function Default<T>(props: TDefaultProps<T>) {
  return <DefaultInternal {...props} />;
}

Default.Default = DefaultInternal;
Default.Expand = Expand;

export { Default };
export type { TDefaultProps };
