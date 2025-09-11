import {
  Link,
  Outlet,
  useChildMatches,
  useMatches,
  useRouterState,
} from "@tanstack/react-router";
import { JsonViewer } from "~/components";

export function TraditionalPattern() {
  const childMatches = useChildMatches();
  const routerState = useRouterState();
  const matches = useMatches();
  // Encontra o match da rota atual
  const thisMatch = matches.find(
    (match) => match.routeId === "tableTraditionalOptionsRoute"
  ); // ajuste o id conforme gerado ajusta arui

  const opcoes = thisMatch?.staticData?.dataPegarDepois ?? [];
  console.log(`TraditionalPattern`, { opcoes, matches });
  // const posts = useLoaderData({ from: "/traditional-pattern" });

  return (
    <div className="p-2">
      Traditional Root
      <Link
        to="/traditional-pattern/column-order"
        className="[&.active]:font-bold"
      >
        Column Order
      </Link>
      <JsonViewer value={{ routerState, childMatches }} />
      <Outlet />
    </div>
  );
}
