import {
  Link,
  Outlet,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  useChildMatches,
  useLocation,
  useRouterState,
} from "@tanstack/react-router";
import i18next from "i18next";
import { lazy, useMemo } from "react";
import { Home } from "~/pages/Home";

const OPTIONS = [
  {
    label: "TRADITIONAL_PATTERN",
    path: "/traditional-pattern",
  },
  {
    label: "COMPOSITION_PATTERN",
    path: "/composition-pattern",
  },
];

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
      pageTitle: "Table Component React",
      breadcrumbs: [],
      options: [
        {
          label: "TRADITIONAL_PATTERN",
          path: "/traditional-pattern",
        },
        {
          label: "COMPOSITION_PATTERN",
          path: "/composition-pattern",
        },
      ],
    };
  },
  pendingComponent: LoadingPage,
  errorComponent: () => <span>Quebrou</span>,
  component: () => <Home />,
});

const tableTraditionalOutletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/traditional-pattern",
  component: Outlet,
  staticData: {
    routerName: i18next.t("TRADITIONAL_PATTERN"),
  },
});

const tableTraditionalRootRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/",
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("TRADITIONAL_PATTERN"),
      options: [
        {
          label: "COLUMN_ORDER",
          path: "column-order/",
        },
        {
          label: "COLUMN_VISIBILITY",
          path: "column-visibility",
        },
        {
          label: "EDITABLE",
          path: "editable",
        },
        {
          label: "ELLIPSIS",
          path: "ellipsis",
        },
        {
          label: "EXPAND_LINE",
          path: "expand-line",
        },
        {
          label: "EXPORT",
          path: "export",
        },
        {
          label: "FAVORITES",
          path: "favorites",
        },
        {
          label: "FILTER",
          path: "filter",
        },
        {
          label: "FOOTER",
          path: "footer",
        },
        {
          label: "FULL_EDITABLE",
          path: "full-editable",
        },
        {
          label: "LOADING",
          path: "loading",
        },
        {
          label: "PAGINATION",
          path: "pagination",
        },
        {
          label: "RESIZING",
          path: "resizing",
        },
        {
          label: "SELECTION",
          path: "selection",
        },
        {
          label: "SORT",
          path: "sort",
        },
        {
          label: "VIRTUALIZED",
          path: "virtualized",
        },
      ],
    };
  },
  pendingComponent: LoadingPage,
  errorComponent: () => <span>Quebrou</span>,
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern"),
    "TraditionalPattern"
  ),
});

const tableTraditionalColumnOrderRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/column-order",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/ColumnOrder"),
    "ColumnOrderPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("COLUMN_ORDER"),
    };
  },
  staticData: {
    routerName: i18next.t("COLUMN_ORDER"),
  },
});

const tableTraditionalColumnVisibilityRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/column-visibility",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/ColumnVisibility"),
    "ColumnVisibilityPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("COLUMN_VISIBILITY"),
    };
  },
  staticData: {
    routerName: i18next.t("COLUMN_VISIBILITY"),
  },
});

const tableTraditionalEditableRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/editable",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Editable"),
    "EditablePage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("EDITABLE"),
      breadcrumbs: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: i18next.t("TRADITIONAL_PATTERN"),
          link: "/traditional-pattern",
        },
        {
          label: i18next.t("EDITABLE"),
        },
      ],
    };
  },
  staticData: {
    routerName: i18next.t("EDITABLE"),
  },
});

const tableTraditionalEllipsisRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/ellipsis",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Ellipsis"),
    "EllipsisPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: "Ellipsis",
    };
  },
  staticData: {
    routerName: "Ellipsis",
  },
});

const tableTraditionalExpandLineRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/expand-line",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/ExpandedLine"),
    "ExpandedLinePage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("EXPAND_LINE"),
    };
  },
  staticData: {
    routerName: i18next.t("EXPAND_LINE"),
  },
});

const tableTraditionalExportRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/export",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Export"),
    "ExportPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("EXPORT"),
    };
  },
  staticData: {
    routerName: i18next.t("EXPORT"),
  },
});

const tableTraditionalFavoritesRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/favorites",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Favorites"),
    "FavoritesPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("FAVORITES"),
    };
  },
  staticData: {
    routerName: i18next.t("FAVORITES"),
  },
});

const tableTraditionalFilterRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/filter",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Filter"),
    "FilterPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("FILTER"),
    };
  },
  staticData: {
    routerName: i18next.t("FILTER"),
  },
});

const tableTraditionalFooterRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/footer",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Footer"),
    "FooterPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("FOOTER"),
    };
  },
  staticData: {
    routerName: i18next.t("FOOTER"),
  },
});

const tableTraditionalFullEditableRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/full-editable",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/FullEditable"),
    "FullEditablePage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("FULL_EDITABLE"),
    };
  },
  staticData: {
    routerName: i18next.t("FULL_EDITABLE"),
  },
});

const tableTraditionalLoadingRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/loading",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Loading"),
    "LoadingPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("LOADING"),
    };
  },
  staticData: {
    routerName: i18next.t("LOADING"),
  },
});

const tableTraditionalPaginationRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/pagination",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Pagination"),
    "PaginationPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("PAGINATION"),
    };
  },
  staticData: {
    routerName: i18next.t("PAGINATION"),
  },
});

const tableTraditionalResizingRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/resizing",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Resizing"),
    "ResizingPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("RESIZING"),
    };
  },
  staticData: {
    routerName: i18next.t("RESIZING"),
  },
});

const tableTraditionalSelectionRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/selection",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Selection"),
    "SelectionPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("SELECTION"),
    };
  },
  staticData: {
    routerName: i18next.t("SELECTION"),
  },
});

const tableTraditionalSortRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/sort",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Sort"),
    "SortPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("SORT"),
    };
  },
  staticData: {
    routerName: i18next.t("SORT"),
  },
});

const tableTraditionalVirtualizedRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/virtualized",
  component: lazyRouteComponent(
    () => import("~/pages/TraditionalPattern/Virtualized"),
    "VirtualizedPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("VIRTUALIZED"),
    };
  },
  staticData: {
    routerName: i18next.t("VIRTUALIZED"),
  },
  pendingComponent: LoadingPage,
});

const tableCompositionOutletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/composition-pattern",
  component: Outlet,
  staticData: {
    routerName: i18next.t("COMPOSITION_PATTERN"),
  },
});

const tableCompositionRootRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/",
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("COMPOSITION_PATTERN"),
      breadcrumbs: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: i18next.t("COMPOSITION_PATTERN"),
        },
      ],
      options: [
        {
          label: "COLUMN_ORDER",
          path: "column-order/",
        },
        {
          label: "COLUMN_VISIBILITY",
          path: "column-visibility",
        },
        {
          label: "DEFAULT",
          path: "default",
        },
        {
          label: "EDITABLE_BY_ROW",
          path: "editable-by-row",
        },
        {
          label: "ELLIPSIS",
          path: "ellipsis",
        },
        {
          label: "EXPAND_ROW",
          path: "expand-row",
        },
        {
          label: "EXPORT",
          path: "export",
        },
        {
          label: "FILTER",
          path: "filter",
        },
        {
          label: "FOOTER",
          path: "footer",
        },
        {
          label: "FULL_EDITABLE",
          path: "full-editable",
        },
        {
          label: "LOADING",
          path: "loading",
        },
        {
          label: "PAGINATION",
          path: "pagination",
        },
        {
          label: "RESIZING",
          path: "resizing",
        },
        {
          label: "SELECTION",
          path: "selection",
        },
        {
          label: "SORT",
          path: "sort",
        },
        {
          label: "VIRTUALIZATION",
          path: "virtualization",
        },
      ],
    };
  },
  pendingComponent: LoadingPage,
  errorComponent: () => <span>Quebrou</span>,
  component: lazyRouteComponent(
    () => import("~/pages/TableMega"),
    "TableMegaPage"
  ),
});

const tableCompositionColumnOrderRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/column-order",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/ColumnOrder"),
    "TableMegaColumnOrderPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {};
  },
  staticData: {
    routerName: i18next.t("COLUMN_ORDER"),
  },
});

const tableCompositionColumnVisibilityRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/column-visibility",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/ColumnVisibility"),
    "TableMegaColumnVisibilityPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("COLUMN_VISIBILITY"),
    };
  },
  staticData: {
    routerName: i18next.t("COLUMN_VISIBILITY"),
  },
});

const tableCompositionDefaultRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/default",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Default"),
    "TableMegaDefaultPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("DEFAULT"),
    };
  },
  staticData: {
    routerName: i18next.t("DEFAULT"),
  },
});

const tableCompositionEditableByRowRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/editable-by-row",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/EditableByRow"),
    "TableMegaEditableByRowPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("EDITABLE_BY_ROW"),
    };
  },
  staticData: {
    routerName: i18next.t("EDITABLE_BY_ROW"),
  },
});

const tableCompositionEllipsisRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/ellipsis",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Ellipsis"),
    "TableMegaEllipsisPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: "Ellipsis",
    };
  },
  staticData: {
    routerName: "Ellipsis",
  },
});

const tableCompositionExpandRowRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/expand-row",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/ExpandRow"),
    "TableMegaExpandRowPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("EXPAND_ROW"),
    };
  },
  staticData: {
    routerName: i18next.t("EXPAND_ROW"),
  },
});

const tableCompositionExportRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/export",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Export"),
    "TableMegaExportPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("EXPORT"),
    };
  },
  staticData: {
    routerName: i18next.t("EXPORT"),
  },
});

const tableCompositionFilterRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/filter",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Filter"),
    "TableMegaFilterPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("FILTER"),
    };
  },
  staticData: {
    routerName: i18next.t("FILTER"),
  },
});

const tableCompositionFooterRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/footer",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Footer"),
    "TableMegaFooterPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("FOOTER"),
    };
  },
  staticData: {
    routerName: i18next.t("FOOTER"),
  },
});

const tableCompositionFullEditableRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/full-editable",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/FullEditable"),
    "TableMegaFullEditablePage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("FULL_EDITABLE"),
    };
  },
  staticData: {
    routerName: i18next.t("FULL_EDITABLE"),
  },
});

const tableCompositionLoadingRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/loading",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Loading"),
    "TableMegaLoadingPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("LOADING"),
    };
  },

  staticData: {
    routerName: i18next.t("LOADING"),
  },
});

const tableCompositionPaginationRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/pagination",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Pagination"),
    "TableMegaPaginationPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("PAGINATION"),
    };
  },
  staticData: {
    routerName: i18next.t("PAGINATION"),
  },
});

const tableCompositionResizingRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/resizing",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Resizing"),
    "TableMegaResizingPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("RESIZING"),
    };
  },
  staticData: {
    routerName: i18next.t("RESIZING"),
  },
});

const tableCompositionSelectionRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/selection",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Selection"),
    "TableMegaSelectionPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("SELECTION"),
    };
  },
  staticData: {
    routerName: i18next.t("SELECTION"),
  },
});

const tableCompositionSortRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/sort",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Sort"),
    "TableMegaSortPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("SORT"),
    };
  },
  staticData: {
    routerName: i18next.t("SORT"),
  },
});

const tableCompositionVirtualizationRoute = createRoute({
  getParentRoute: () => tableCompositionOutletRoute,
  path: "/virtualization",
  component: lazyRouteComponent(
    () => import("~/pages/TableMega/Virtualization"),
    "TableMegaVirtualizationPage"
  ),
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: i18next.t("VIRTUALIZATION"),
    };
  },
  staticData: {
    routerName: i18next.t("VIRTUALIZATION"),
  },
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  tableTraditionalOutletRoute.addChildren([
    tableTraditionalRootRoute,
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
  tableCompositionOutletRoute.addChildren([
    tableCompositionRootRoute,
    tableCompositionColumnOrderRoute,
    tableCompositionColumnVisibilityRoute,
    tableCompositionEditableByRowRoute,
    tableCompositionDefaultRoute,
    tableCompositionEllipsisRoute,
    tableCompositionExpandRowRoute,
    tableCompositionExportRoute,
    tableCompositionFilterRoute,
    tableCompositionFooterRoute,
    tableCompositionFullEditableRoute,
    tableCompositionLoadingRoute,
    tableCompositionPaginationRoute,
    tableCompositionResizingRoute,
    tableCompositionSelectionRoute,
    tableCompositionSortRoute,
    tableCompositionVirtualizationRoute,
  ]),
]);

const hashHistory = createHashHistory();

export const router = createRouter({ routeTree, history: hashHistory });

import {
  _getMenus,
  _sortCustomName,
  _sortCustomOrder,
  getTriRoutes,
} from "~/hooks/useRoutesMenu/utils";
import { useTranslation } from "~/hooks/useTranslation";

import { InjectorProviders, RoutesConfig } from "~/components";

import { LoadingPage } from "~/components/LoadingForPage";
import { TraditionalPattern } from "~/pages/TraditionalPattern";
import { TRoutesMenu } from "~/types";
import { delay } from "~/utils";
import { TTriRoutes } from "./types";

export function useRoutesMenu() {
  const { translate, currentLanguage } = useTranslation();
  const location = useLocation();

  return {
    globalRoutes: [],
    triRoutes: [],
    globalMenus: [],
  };
}
