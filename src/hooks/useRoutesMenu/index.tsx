import {
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  useChildMatches,
  useLocation,
  useRouterState,
} from "@tanstack/react-router";
import { lazy, useMemo } from "react";
import { Home } from "~/pages/Home";

const rootRoute = createRootRoute({
  component: () => (
    <InjectorProviders>
      <RoutesConfig />
    </InjectorProviders>
  ),
  // notFoundComponent: lazyRouteComponent(() => import("~/pages/NotFound")),
  loader: () => <span>Carregando</span>,
  notFoundComponent: lazyRouteComponent(
    () => import("~/pages/NotFound"),
    "NotFoundPage"
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
});

const tableTraditionalRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/traditional-pattern",
  loader: () => {
    return "Hello World";
  },
  component: Outlet,
});

const tableTraditionalOptionsRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/",
  context: (...a) => {
    console.log({ a });
  },
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern"),
    "TraditionalPattern"
  ),
  staticData: {
    // <--- use esta propriedade!
    dataPegarDepois: [{ id: 1, path: "bataforte" }],
  },
});

const tableTraditionalColumnOrderRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/column-order",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/ColumnOrder"),
    "ColumnOrderPage"
  ),
});

const tableTraditionalColumnVisibilityRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/column-visibility",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/ColumnVisibility"),
    "ColumnVisibilityPage"
  ),
});

const tableTraditionalEditableRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/editable",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Editable"),
    "EditablePage"
  ),
});

const tableTraditionalEllipsisRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/ellipsis",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Ellipsis"),
    "EllipsisPage"
  ),
});

const tableTraditionalExpandLineRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/expand-line",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/ExpandedLine"),
    "ExpandedLinePage"
  ),
});

const tableTraditionalExportRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/export",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Export"),
    "ExportPage"
  ),
});

const tableTraditionalFavoritesRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/favorites",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Favorites"),
    "FavoritesPage"
  ),
});

const tableTraditionalFilterRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/filter",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Filter"),
    "FilterPage"
  ),
});

const tableTraditionalFooterRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/footer",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Footer"),
    "FooterPage"
  ),
});

const tableTraditionalFullEditableRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/full-editable",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/FullEditable"),
    "FullEditablePage"
  ),
});

const tableTraditionalLoadingRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/loading",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Loading"),
    "LoadingPage"
  ),
});

const tableTraditionalPaginationRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/pagination",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Pagination"),
    "PaginationPage"
  ),
});

const tableTraditionalResizingRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/resizing",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Resizing"),
    "ResizingPage"
  ),
});

const tableTraditionalSelectionRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/selection",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Selection"),
    "SelectionPage"
  ),
});

const tableTraditionalSortRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/sort",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Sort"),
    "SortPage"
  ),
});

const tableTraditionalVirtualizedRoute = createRoute({
  getParentRoute: () => tableTraditionalRootRoute,
  path: "/virtualized",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Virtualized"),
    "VirtualizedPage"
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  tableTraditionalRootRoute.addChildren([
    tableTraditionalOptionsRoute,
    tableTraditionalColumnOrderRoute,
    tableTraditionalColumnVisibilityRoute,
    tableTraditionalEditableRoute,
    tableTraditionalEllipsisRoute,
    tableTraditionalExpandLineRoute,
    tableTraditionalExportRoute,
    tableTraditionalFavoritesRoute,
    tableTraditionalFilterRoute,
    tableTraditionalFooterRoute,
    tableTraditionalFullEditableRoute,
    tableTraditionalLoadingRoute,
    tableTraditionalPaginationRoute,
    tableTraditionalResizingRoute,
    tableTraditionalSelectionRoute,
    tableTraditionalSortRoute,
    tableTraditionalVirtualizedRoute,
  ]),
]);

export const router = createRouter({ routeTree });

import {
  _getMenus,
  _sortCustomName,
  _sortCustomOrder,
  getTriRoutes,
} from "~/hooks/useRoutesMenu/utils";
import { useTranslation } from "~/hooks/useTranslation";

import { InjectorProviders, RoutesConfig } from "~/components";

import { TraditionalPattern } from "~/pages/TraditionalPattern";
import { TRoutesMenu } from "~/types";
import { TTriRoutes } from "./types";

const TableMegaPage = lazy(() =>
  import("~/pages/TableMega").then(({ TableMegaPage: TableMega }) => ({
    default: TableMega,
  }))
);

const TableMegaDefaultPage = lazy(() =>
  import("~/pages/TableMega/Default").then(
    ({ TableMegaDefaultPage: Default }) => ({
      default: Default,
    })
  )
);

const TableMegaSortPage = lazy(() =>
  import("~/pages/TableMega/Sort").then(({ TableMegaSortPage: Sort }) => ({
    default: Sort,
  }))
);

const TableMegaColumnOrderPage = lazy(() =>
  import("~/pages/TableMega/ColumnOrder").then(
    ({ TableMegaColumnOrderPage: ColumnOrder }) => ({
      default: ColumnOrder,
    })
  )
);

const TableMegaColumnVisibilityPage = lazy(() =>
  import("~/pages/TableMega/ColumnVisibility").then(
    ({ TableMegaColumnVisibilityPage: ColumnVisibility }) => ({
      default: ColumnVisibility,
    })
  )
);

const TableMegaEditableRowPage = lazy(() =>
  import("~/pages/TableMega/EditableRow").then(
    ({ TableMegaEditableRowPage: EditableRow }) => ({
      default: EditableRow,
    })
  )
);

const TableMegaEllipsisPage = lazy(() =>
  import("~/pages/TableMega/Ellipsis").then(
    ({ TableMegaEllipsisPage: Ellipsis }) => ({
      default: Ellipsis,
    })
  )
);

const TableMegaExpandedRowPage = lazy(() =>
  import("~/pages/TableMega/ExpandedRow").then(
    ({ TableMegaExpandedRowPage: ExpandRow }) => ({
      default: ExpandRow,
    })
  )
);

const TableMegaExportPage = lazy(() =>
  import("~/pages/TableMega/Export").then(
    ({ TableMegaExportPage: Export }) => ({
      default: Export,
    })
  )
);

const TableMegaFilterPage = lazy(() =>
  import("~/pages/TableMega/Filter").then(
    ({ TableMegaFilterPage: Filter }) => ({
      default: Filter,
    })
  )
);

const TableMegaFullEditablePage = lazy(() =>
  import("~/pages/TableMega/FullEditable").then(
    ({ TableMegaFullEditablePage: FullEditable }) => ({
      default: FullEditable,
    })
  )
);

const TableMegaFooterPage = lazy(() =>
  import("~/pages/TableMega/Footer").then(
    ({ TableMegaFooterPage: Footer }) => ({
      default: Footer,
    })
  )
);

const TableMegaLoadingPage = lazy(() =>
  import("~/pages/TableMega/Loading").then(
    ({ TableMegaLoadingPage: Loading }) => ({
      default: Loading,
    })
  )
);

const TableMegaPaginationPage = lazy(() =>
  import("~/pages/TableMega/Pagination").then(
    ({ TableMegaPaginationPage: Pagination }) => ({
      default: Pagination,
    })
  )
);

const TableMegaResizingPage = lazy(() =>
  import("~/pages/TableMega/Resizing").then(
    ({ TableMegaResizingPage: Resizing }) => ({
      default: Resizing,
    })
  )
);

const TableMegaSelectionPage = lazy(() =>
  import("~/pages/TableMega/Selection").then(
    ({ TableMegaSelectionPage: Selection }) => ({
      default: Selection,
    })
  )
);

const TableMegaVirtualizationPage = lazy(() =>
  import("~/pages/TableMega/Virtualization").then(
    ({ TableMegaVirtualizationPage: Virtualization }) => ({
      default: Virtualization,
    })
  )
);

export function useRoutesMenu() {
  const { translate, currentLanguage } = useTranslation();
  const location = useLocation();
  const globalRoutes: TRoutesMenu[] = useMemo(
    (): TRoutesMenu[] =>
      [
        {
          name: "Home",
          path: "/",
          element: <Home />,
          label: "Home",
          hide: {
            home: true,
            otherComponents: true,
          },
          order: 0,
        },

        {
          name: "TableMega",
          path: "/table-mega",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaPage />,
          label: `Table Mega`,
        },
        {
          name: "TableMegaDefault",
          path: "/table-mega/default",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaDefaultPage />,
          label: `Table Mega - Default`,
        },
        {
          name: "TableMegaSortPage",
          path: "/table-mega/sort",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaSortPage />,
          label: `Table Mega - Sort`,
        },
        {
          name: "TableMegaColumnOrderPage",
          path: "/table-mega/column-order",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaColumnOrderPage />,
          label: `Table Mega - Column Order`,
        },
        {
          name: "TableMegaColumnVisibilityPage",
          path: "/table-mega/column-visibility",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaColumnVisibilityPage />,
          label: `Table Mega - Column Visibility`,
        },
        {
          name: "TableMegaEditableRowPage",
          path: "/table-mega/editable-row",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaEditableRowPage />,
          label: `Table Mega - Editable Row`,
        },
        {
          name: "TableMegaEllipsisPage",
          path: "/table-mega/ellipsis",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaEllipsisPage />,
          label: `Table Mega - Ellipsis`,
        },
        {
          name: "TableMegaExpandedRowPage",
          path: "/table-mega/expand-row",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaExpandedRowPage />,
          label: `Table Mega - Expand Row`,
        },
        {
          name: "TableMegaExportPage",
          path: "/table-mega/export",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaExportPage />,
          label: `Table Mega - Export`,
        },
        {
          name: "TableMegaFilterPage",
          path: "/table-mega/filter",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaFilterPage />,
          label: `Table Mega - Filter`,
        },
        {
          name: "TableMegaFooterPage",
          path: "/table-mega/footer",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaFooterPage />,
          label: `Table Mega - Footer`,
        },
        {
          name: "TableMegaFullEditablePage",
          path: "/table-mega/full-editable",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaFullEditablePage />,
          label: `Table Mega - Full Editable`,
        },
        {
          name: "TableMegaLoadingPage",
          path: "/table-mega/loading",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaLoadingPage />,
          label: `Table Mega - Loading`,
        },
        {
          name: "TableMegaPaginationPage",
          path: "/table-mega/pagination",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaPaginationPage />,
          label: `Table Mega - Pagination - Under Construction`,
        },
        {
          name: "TableMegaResizingPage",
          path: "/table-mega/resizing",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaResizingPage />,
          label: `Table Mega - Resizing`,
        },
        {
          name: "TableMegaSelectionPage",
          path: "/table-mega/selection",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaSelectionPage />,
          label: `Table Mega - Selection`,
          subs: [
            {
              name: "TableMegaVirtualizationPage",
              path: "virtualization",
              implements_code:
                "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
              docs_code:
                "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
              element: <TableMegaVirtualizationPage />,
              label: `Table Mega - Virtualization`,
            },
          ],
        },
      ]
        .sort(_sortCustomName)
        .sort(_sortCustomOrder),
    [currentLanguage]
  );

  const triRoutes: TTriRoutes = useMemo(
    () => getTriRoutes(globalRoutes, location.pathname),
    [currentLanguage, location.pathname]
  );

  return {
    globalRoutes,
    triRoutes,
    globalMenus: (filterValue: string) => _getMenus(globalRoutes, filterValue),
  };
}
