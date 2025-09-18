import {
  CatchBoundary,
  Outlet,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";
import { InjectorProviders, RoutesConfig } from "~/components";
import { Home } from "~/pages/Home";
import { _sortCustomName, _sortCustomOrder } from "./utils";

const rootRoute = createRootRoute({
  component: () => (
    <InjectorProviders>
      <RoutesConfig />
    </InjectorProviders>
  ),
  notFoundComponent: lazyRouteComponent(
    () => import("~/pages/NotFound"),
    "NotFoundPage"
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: async () => {
    return {
      options: [
        {
          path: "/traditional-pattern",
          staticData: {
            routerName: "TRADITIONAL_PATTERN",
          },
        },
        {
          path: "/composition-pattern",
          staticData: {
            routerName: "COMPOSITION_PATTERN",
          },
        },
      ],
    };
  },
  component: Home,
});

const tableTraditionalOutletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/traditional-pattern",
  component: Outlet,
  staticData: {
    routerName: "TRADITIONAL_PATTERN",
  },
});

const tableTraditionalRootRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern"),
    "TraditionalPattern"
  ),
});

const tableCompositionOutletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/composition-pattern",
  component: Outlet,
  staticData: {
    routerName: "COMPOSITION_PATTERN",
  },
});

const tableCompositionRootRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega"),
    "TableMegaPage"
  ),
});

export const compositionChilds = [
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/column-order",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/ColumnOrder"),
      "TableMegaColumnOrderPage"
    ),
    staticData: {
      routerName: "COLUMN_ORDER",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/column-visibility",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/ColumnVisibility"),
      "TableMegaColumnVisibilityPage"
    ),
    staticData: {
      routerName: "COLUMN_VISIBILITY",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/default",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Default"),
      "TableMegaDefaultPage"
    ),
    staticData: {
      routerName: "DEFAULT",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/editable-by-row",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/EditableByRow"),
      "TableMegaEditableByRowPage"
    ),
    staticData: {
      routerName: "EDITABLE_BY_ROW",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/ellipsis",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Ellipsis"),
      "TableMegaEllipsisPage"
    ),

    staticData: {
      routerName: "ELLIPSIS",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/expand-row",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/ExpandRow"),
      "TableMegaExpandRowPage"
    ),

    staticData: {
      routerName: "EXPAND_ROW",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/export",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Export"),
      "TableMegaExportPage"
    ),

    staticData: {
      routerName: "EXPORT",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/filter",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Filter"),
      "TableMegaFilterPage"
    ),
    staticData: {
      routerName: "FILTER",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/footer",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Footer"),
      "TableMegaFooterPage"
    ),
    staticData: {
      routerName: "FOOTER",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/full-editable",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/FullEditable"),
      "TableMegaFullEditablePage"
    ),
    staticData: {
      routerName: "FULL_EDITABLE",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/loading",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Loading"),
      "TableMegaLoadingPage"
    ),
    staticData: {
      routerName: "LOADING",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/pagination",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Pagination"),
      "TableMegaPaginationPage"
    ),
    staticData: {
      routerName: "PAGINATION",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/resizing",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Resizing"),
      "TableMegaResizingPage"
    ),
    staticData: {
      routerName: "RESIZING",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/selection",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Selection"),
      "TableMegaSelectionPage"
    ),
    staticData: {
      routerName: "SELECTION",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/sort",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Sort"),
      "TableMegaSortPage"
    ),
    staticData: {
      routerName: "SORT",
    },
  },
  {
    getParentRoute: () => tableCompositionOutletRoute,
    path: "/virtualization",
    component: lazyRouteComponent(
      () => import("~/pages/TableMega/Virtualization"),
      "TableMegaVirtualizationPage"
    ),
    staticData: {
      routerName: "VIRTUALIZATION",
    },
  },
]
  .sort(_sortCustomName)
  .sort(_sortCustomOrder);

const compositionChildsRoutes = [];

for (const item of compositionChilds) {
  compositionChildsRoutes.push(createRoute(item));
}

export const traditionalChilds = [
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/column-order",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/ColumnOrder"),
      "ColumnOrderPage"
    ),
    staticData: {
      routerName: "COLUMN_ORDER",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/default",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Default"),
      "DefaultPage"
    ),
    staticData: {
      routerName: "DEFAULT",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/column-visibility",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/ColumnVisibility"),
      "ColumnVisibilityPage"
    ),
    staticData: {
      routerName: "COLUMN_VISIBILITY",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/editable",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/EditableByRow"),
      "TraditionalEditableByRowPage"
    ),
    staticData: {
      routerName: "EDITABLE_BY_ROW",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/ellipsis",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Ellipsis"),
      "EllipsisPage"
    ),
    staticData: {
      routerName: "ELLIPSIS",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/expand-line",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/ExpandRow"),
      "TraditionalExpandRowPage"
    ),
    staticData: {
      routerName: "EXPAND_ROW",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/export",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Export"),
      "ExportPage"
    ),
    staticData: {
      routerName: "EXPORT",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/filter",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Filter"),
      "FilterPage"
    ),
    staticData: {
      routerName: "FILTER",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/footer",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Footer"),
      "FooterPage"
    ),
    staticData: {
      routerName: "FOOTER",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/full-editable",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/FullEditable"),
      "FullEditablePage"
    ),
    staticData: {
      routerName: "FULL_EDITABLE",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/loading",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Loading"),
      "LoadingPage"
    ),
    staticData: {
      routerName: "LOADING",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/pagination",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Pagination"),
      "PaginationPage"
    ),
    staticData: {
      routerName: "PAGINATION",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/resizing",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Resizing"),
      "ResizingPage"
    ),
    staticData: {
      routerName: "RESIZING",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/selection",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Selection"),
      "SelectionPage"
    ),
    staticData: {
      routerName: "SELECTION",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/sort",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Sort"),
      "SortPage"
    ),

    staticData: {
      routerName: "SORT",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/virtualized",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/Virtualized"),
      "VirtualizedPage"
    ),
    staticData: {
      routerName: "VIRTUALIZED",
    },
  },
]
  .sort(_sortCustomName)
  .sort(_sortCustomOrder);

const traditionalChildsRoutes = [];

for (const item of traditionalChilds) {
  traditionalChildsRoutes.push(createRoute(item));
}

const routeTree = rootRoute.addChildren([
  homeRoute,
  tableTraditionalOutletRoute.addChildren([
    tableTraditionalRootRoute,
    ...traditionalChildsRoutes,
  ]),
  tableCompositionOutletRoute.addChildren([
    tableCompositionRootRoute,
    ...compositionChildsRoutes,
  ]),
]);

const hashHistory = createHashHistory();

export const router = createRouter({ routeTree, history: hashHistory });
