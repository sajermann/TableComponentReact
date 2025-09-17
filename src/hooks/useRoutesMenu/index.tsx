import {
  Outlet,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";
import { InjectorProviders, RoutesConfig } from "~/components";
import { LoadingPage } from "~/components/LoadingForPage";
import { Home } from "~/pages/Home";

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
    routerName: "TRADITIONAL_PATTERN",
  },
});

const tableTraditionalRootRoute = createRoute({
  getParentRoute: () => tableTraditionalOutletRoute,
  path: "/",
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: "TRADITIONAL_PATTERN",
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

// const tableTraditionalColumnOrderRoute = createRoute({
//   getParentRoute: () => tableTraditionalOutletRoute,
//   path: "/column-order",
//   component: lazyRouteComponent(
//     () => import("~/pages/TraditionalPattern/ColumnOrder"),
//     "ColumnOrderPage"
//   ),
//   loader: async () => {
//     // await delay(2000); // View Loader :)
//     return {
//       pageTitle: "COLUMN_ORDER",
//     };
//   },
//   staticData: {
//     routerName: "COLUMN_ORDER",
//   },
// });

// const tableTraditionalColumnVisibilityRoute = createRoute({
//   getParentRoute: () => tableTraditionalOutletRoute,
//   path: "/column-visibility",
//   component: lazyRouteComponent(
//     () => import("~/pages/TraditionalPattern/ColumnVisibility"),
//     "ColumnVisibilityPage"
//   ),
//   loader: async () => {
//     // await delay(2000); // View Loader :)
//     return {
//       pageTitle: "COLUMN_VISIBILITY",
//     };
//   },
//   staticData: {
//     routerName: "COLUMN_VISIBILITY",
//   },
// });

// const tableTraditionalEditableRoute = createRoute({
//   getParentRoute: () => tableTraditionalOutletRoute,
//   path: "/editable",
//   component: lazyRouteComponent(
//     () => import("~/pages/TraditionalPattern/Editable"),
//     "EditablePage"
//   ),
//   loader: async () => {
//     // await delay(2000); // View Loader :)
//     return {
//       pageTitle: "EDITABLE",
//       breadcrumbs: [
//         {
//           label: "Home",
//           link: "/",
//         },
//         {
//           label: "TRADITIONAL_PATTERN",
//           link: "/traditional-pattern",
//         },
//         {
//           label: "EDITABLE",
//         },
//       ],
//     };
//   },
//   staticData: {
//     routerName: "EDITABLE",
//   },
// });

// const tableTraditionalEllipsisRoute = createRoute({
//   getParentRoute: () => tableTraditionalOutletRoute,
//   path: "/ellipsis",
//   component: lazyRouteComponent(
//     () => import("~/pages/TraditionalPattern/Ellipsis"),
//     "EllipsisPage"
//   ),
//   loader: async () => {
//     // await delay(2000); // View Loader :)
//     return {
//       pageTitle: "Ellipsis",
//     };
//   },
//   staticData: {
//     routerName: "Ellipsis",
//   },
// });

// const tableTraditionalExpandLineRoute = createRoute({
//   getParentRoute: () => tableTraditionalOutletRoute,
//   path: "/expand-line",
//   component: lazyRouteComponent(
//     () => import("~/pages/TraditionalPattern/ExpandedLine"),
//     "ExpandedLinePage"
//   ),
//   loader: async () => {
//     // await delay(2000); // View Loader :)
//     return {
//       pageTitle: "EXPAND_LINE",
//     };
//   },
//   staticData: {
//     routerName: "EXPAND_LINE",
//   },
// });

const traditionalChilds = [
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
      () => import("~/pages/TraditionalPattern/Editable"),
      "EditablePage"
    ),
    staticData: {
      routerName: "EDITABLE",
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
      routerName: "Ellipsis",
    },
  },
  {
    getParentRoute: () => tableTraditionalOutletRoute,
    path: "/expand-line",
    component: lazyRouteComponent(
      () => import("~/pages/TraditionalPattern/ExpandedLine"),
      "ExpandedLinePage"
    ),
    loader: async () => {
      // await delay(2000); // View Loader :)
      return {
        pageTitle: "EXPAND_LINE",
      };
    },
    staticData: {
      routerName: "EXPAND_LINE",
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
];

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
      pageTitle: "EXPORT",
    };
  },
  staticData: {
    routerName: "EXPORT",
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
      pageTitle: "FAVORITES",
    };
  },
  staticData: {
    routerName: "FAVORITES",
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
      pageTitle: "FILTER",
    };
  },
  staticData: {
    routerName: "FILTER",
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
      pageTitle: "FOOTER",
    };
  },
  staticData: {
    routerName: "FOOTER",
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
      pageTitle: "FULL_EDITABLE",
    };
  },
  staticData: {
    routerName: "FULL_EDITABLE",
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
      pageTitle: "LOADING",
    };
  },
  staticData: {
    routerName: "LOADING",
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
      pageTitle: "PAGINATION",
    };
  },
  staticData: {
    routerName: "PAGINATION",
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
      pageTitle: "RESIZING",
    };
  },
  staticData: {
    routerName: "RESIZING",
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
      pageTitle: "SELECTION",
    };
  },
  staticData: {
    routerName: "SELECTION",
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
      pageTitle: "SORT",
    };
  },
  staticData: {
    routerName: "SORT",
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
      pageTitle: "VIRTUALIZED",
    };
  },
  staticData: {
    routerName: "VIRTUALIZED",
  },
  pendingComponent: LoadingPage,
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
  loader: async () => {
    // await delay(2000); // View Loader :)
    return {
      pageTitle: "COMPOSITION_PATTERN",
      breadcrumbs: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "COMPOSITION_PATTERN",
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
    routerName: "COLUMN_ORDER",
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
      pageTitle: "COLUMN_VISIBILITY",
    };
  },
  staticData: {
    routerName: "COLUMN_VISIBILITY",
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
      pageTitle: "DEFAULT",
    };
  },
  staticData: {
    routerName: "DEFAULT",
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
      pageTitle: "EDITABLE_BY_ROW",
    };
  },
  staticData: {
    routerName: "EDITABLE_BY_ROW",
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
      pageTitle: "EXPAND_ROW",
    };
  },
  staticData: {
    routerName: "EXPAND_ROW",
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
      pageTitle: "EXPORT",
    };
  },
  staticData: {
    routerName: "EXPORT",
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
      pageTitle: "FILTER",
    };
  },
  staticData: {
    routerName: "FILTER",
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
      pageTitle: "FOOTER",
    };
  },
  staticData: {
    routerName: "FOOTER",
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
      pageTitle: "FULL_EDITABLE",
    };
  },
  staticData: {
    routerName: "FULL_EDITABLE",
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
      pageTitle: "LOADING",
    };
  },

  staticData: {
    routerName: "LOADING",
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
      pageTitle: "PAGINATION",
    };
  },
  staticData: {
    routerName: "PAGINATION",
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
      pageTitle: "RESIZING",
    };
  },
  staticData: {
    routerName: "RESIZING",
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
      pageTitle: "SELECTION",
    };
  },
  staticData: {
    routerName: "SELECTION",
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
      pageTitle: "SORT",
    };
  },
  staticData: {
    routerName: "SORT",
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
      pageTitle: "VIRTUALIZATION",
    };
  },
  staticData: {
    routerName: "VIRTUALIZATION",
  },
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  tableTraditionalOutletRoute.addChildren([
    tableTraditionalRootRoute,
    ...traditionalChilds,
    // tableTraditionalColumnOrderRoute,
    // tableTraditionalColumnVisibilityRoute,
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
