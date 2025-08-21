import { lazy, useMemo } from "react";
import { useLocation } from "react-router";

import {
  _getMenus,
  _sortCustomName,
  _sortCustomOrder,
  getTriRoutes,
} from "~/hooks/useRoutesMenu/utils";
import { useTranslation } from "~/hooks/useTranslation";
import { Home } from "~/pages/Home";
import { TRoutesMenu } from "~/types";
import { TTriRoutes } from "./types";

const NotFoundPage = lazy(() =>
  import("~/pages/NotFound").then(({ NotFoundPage: NotFound }) => ({
    default: NotFound,
  }))
);

const ColumnVisibilityPage = lazy(() =>
  import("~/pages/ColumnVisibility").then(
    ({ ColumnVisibilityPage: ColumnVisibility }) => ({
      default: ColumnVisibility,
    })
  )
);

const ColumnOrderPage = lazy(() =>
  import("~/pages/ColumnOrder").then(({ ColumnOrderPage: ColumnOrder }) => ({
    default: ColumnOrder,
  }))
);

// const FilterPage = lazy(() =>
//   import("~/pages/Filter").then(({ FilterPage: Filter }) => ({
//     default: Filter,
//   }))
// );

// const ExportPage = lazy(() =>
//   import("~/pages/Export").then(({ ExportPage: Export }) => ({
//     default: Export,
//   }))
// );

// const SortPage = lazy(() =>
//   import("~/pages/Sort").then(({ SortPage: Sort }) => ({
//     default: Sort,
//   }))
// );

// const EditablePage = lazy(() =>
//   import("~/pages/Editable").then(({ EditablePage: Editable }) => ({
//     default: Editable,
//   }))
// );

// const FullEditablePage = lazy(() =>
//   import("~/pages/FullEditable").then(({ FullEditablePage: FullEditable }) => ({
//     default: FullEditable,
//   }))
// );

// const VirtualizedPage = lazy(() =>
//   import("~/pages/Virtualized").then(({ VirtualizedPage: Virtualized }) => ({
//     default: Virtualized,
//   }))
// );

// const PaginationTablePage = lazy(() =>
//   import("~/pages/Pagination").then(({ PaginationPage: Pagination }) => ({
//     default: Pagination,
//   }))
// );

// const FavoritesPage = lazy(() =>
//   import("~/pages/Favorites").then(({ FavoritesPage: Favorites }) => ({
//     default: Favorites,
//   }))
// );

// const EllipsisPage = lazy(() =>
//   import("~/pages/Ellipsis").then(({ EllipsisPage: Ellipsis }) => ({
//     default: Ellipsis,
//   }))
// );

// const ResizingPage = lazy(() =>
//   import("~/pages/Resizing").then(({ ResizingPage: Resizing }) => ({
//     default: Resizing,
//   }))
// );

// const SelectionPage = lazy(() =>
//   import("~/pages/Selection").then(({ SelectionPage: Selection }) => ({
//     default: Selection,
//   }))
// );

// const ExpandedLinePage = lazy(() =>
//   import("~/pages/ExpandedLine").then(({ ExpandedLinePage: ExpandedLine }) => ({
//     default: ExpandedLine,
//   }))
// );

// const LoadingPage = lazy(() =>
//   import("~/pages/Loading").then(({ LoadingPage: Loading }) => ({
//     default: Loading,
//   }))
// );

// const FooterPage = lazy(() =>
//   import("~/pages/Footer").then(({ FooterPage: Footer }) => ({
//     default: Footer,
//   }))
// );

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
          name: "ColumnVisibility",
          path: "/table/column-visibility",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/ColumnVisibility",
          element: <ColumnVisibilityPage />,
          label: translate("COLUMN_VISIBILITY"),
        },
        {
          name: "ColumnOrder",
          path: "/table/column-order",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/ColumnOrder",
          element: <ColumnOrderPage />,
          label: translate("COLUMN_ORDER"),
        },
        // {
        //   name: "Filter",
        //   path: "/table/filter",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Filter",
        //   element: <FilterPage />,
        //   label: translate("FILTER"),
        // },
        // {
        //   name: "Selection",
        //   path: "/table/selection",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Selection",
        //   element: <SelectionPage />,
        //   label: translate("SELECTION"),
        // },
        // {
        //   name: "ExpandedLine",
        //   path: "/table/expand-line",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/ExpandedLine",
        //   element: <ExpandedLinePage />,
        //   label: translate("EXPAND_LINE"),
        // },
        // {
        //   name: "Loading",
        //   path: "/table/loading",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Loading",
        //   element: <LoadingPage />,
        //   label: translate("LOADING"),
        // },

        // {
        //   name: "Sort",
        //   path: "/table/sort",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Sort",
        //   element: <SortPage />,
        //   label: translate("SORT"),
        // },
        // {
        //   name: "Editable",
        //   path: "/table/editable",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Editable",
        //   element: <EditablePage />,
        //   label: translate("EDITABLE"),
        // },
        // {
        //   name: "FullEditable",
        //   path: "/table/full-editable",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/FullEditable",
        //   element: <FullEditablePage />,
        //   label: translate("FULL_EDITABLE"),
        // },
        // {
        //   name: "Virtualized",
        //   path: "/table/virtualized",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
        //   element: <VirtualizedPage />,
        //   label: translate("VIRTUALIZED"),
        // },
        // {
        //   name: "Pagination",
        //   path: "/table/pagination",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Pagination",
        //   element: <PaginationTablePage />,
        //   label: translate("PAGINATION"),
        // },
        // {
        //   name: "Favorites",
        //   path: "/table/favorites",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Favorites",
        //   element: <FavoritesPage />,
        //   label: translate("FAVORITES"),
        // },
        // {
        //   name: "Ellipsis",
        //   path: "/table/ellipsis",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Ellipsis",
        //   element: <EllipsisPage />,
        //   label: "Ellipsis",
        // },
        // {
        //   name: "Resizing",
        //   path: "/table/resizing",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Resizing",
        //   element: <ResizingPage />,
        //   label: translate("RESIZING"),
        // },

        // {
        //   name: "Export",
        //   path: "/table/export",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Export",
        //   element: <ExportPage />,
        //   label: translate("EXPORT"),
        // },
        // {
        //   name: "Footer",
        //   path: "/table/footer",
        //   implements_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
        //   docs_code:
        //     "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Footer",
        //   element: <FooterPage />,
        //   label: translate("FOOTER"),
        // },
        {
          name: "NotFound",
          path: "*",
          element: <NotFoundPage />,
          label: translate("NOT_FOUND"),
          hide: {
            home: true,
            otherComponents: true,
          },
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
