import { Default as DefaultInternal, TDefaultProps } from "./Default";
import { Expand } from "./Expand";

function Default(props: TDefaultProps) {
  return <DefaultInternal {...props} />;
}

Default.Default = DefaultInternal;
Default.Expand = Expand;

export { Default };
export type { TDefaultProps };
