import { Default, TDefaultProps } from "./Default";
import { Virtualized } from "./Virtualized";

function Rows<T>(props: TDefaultProps<T>) {
  return <Default {...props} />;
}

Rows.Virtualized = Virtualized;
Rows.Default = Default;

export { Rows };

// TODO: Verificar questão do Default, se nao colocar ele funciona do jeito que eu
// queria, pegando ele automatico, mas se eu coloco o Expand, preciso colocar o
// Default antes, video pages/TableMega/ExpandRow
