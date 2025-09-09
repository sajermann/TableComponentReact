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

const ColumnOrderPage = lazy(() =>
  import("~/pages/ColumnOrder").then(({ ColumnOrderPage: ColumnOrder }) => ({
    default: ColumnOrder,
  }))
);

const ColumnVisibilityPage = lazy(() =>
  import("~/pages/ColumnVisibility").then(
    ({ ColumnVisibilityPage: ColumnVisibility }) => ({
      default: ColumnVisibility,
    })
  )
);

const EditablePage = lazy(() =>
  import("~/pages/Editable").then(({ EditablePage: Editable }) => ({
    default: Editable,
  }))
);

const EllipsisPage = lazy(() =>
  import("~/pages/Ellipsis").then(({ EllipsisPage: Ellipsis }) => ({
    default: Ellipsis,
  }))
);

const ExpandedLinePage = lazy(() =>
  import("~/pages/ExpandedLine").then(({ ExpandedLinePage: ExpandedLine }) => ({
    default: ExpandedLine,
  }))
);

const ExportPage = lazy(() =>
  import("~/pages/Export").then(({ ExportPage: Export }) => ({
    default: Export,
  }))
);

const FavoritesPage = lazy(() =>
  import("~/pages/Favorites").then(({ FavoritesPage: Favorites }) => ({
    default: Favorites,
  }))
);

const FilterPage = lazy(() =>
  import("~/pages/Filter").then(({ FilterPage: Filter }) => ({
    default: Filter,
  }))
);

const FooterPage = lazy(() =>
  import("~/pages/Footer").then(({ FooterPage: Footer }) => ({
    default: Footer,
  }))
);

const FullEditablePage = lazy(() =>
  import("~/pages/FullEditable").then(({ FullEditablePage: FullEditable }) => ({
    default: FullEditable,
  }))
);

const LoadingPage = lazy(() =>
  import("~/pages/Loading").then(({ LoadingPage: Loading }) => ({
    default: Loading,
  }))
);

const PaginationTablePage = lazy(() =>
  import("~/pages/Pagination").then(({ PaginationPage: Pagination }) => ({
    default: Pagination,
  }))
);

const ResizingPage = lazy(() =>
  import("~/pages/Resizing").then(({ ResizingPage: Resizing }) => ({
    default: Resizing,
  }))
);

const SelectionPage = lazy(() =>
  import("~/pages/Selection").then(({ SelectionPage: Selection }) => ({
    default: Selection,
  }))
);

const SortPage = lazy(() =>
  import("~/pages/Sort").then(({ SortPage: Sort }) => ({
    default: Sort,
  }))
);

const VirtualizedPage = lazy(() =>
  import("~/pages/Virtualized").then(({ VirtualizedPage: Virtualized }) => ({
    default: Virtualized,
  }))
);

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

const TableMegaFavoritesPage = lazy(() =>
  import("~/pages/TableMega/Favorites").then(
    ({ TableMegaFavoritesPage: Favorites }) => ({
      default: Favorites,
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

export function useRoutesMenu() {
  const { translate, currentLanguage } = useTranslation();
  const location = useLocation();
  const globalRoutes: TRoutesMenu[] = useMemo(
    (): TRoutesMenu[] =>
      [
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
          name: "ColumnOrder",
          path: "/column-order",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/ColumnOrder",
          element: <ColumnOrderPage />,
          label: translate("COLUMN_ORDER"),
        },
        {
          name: "ColumnVisibility",
          path: "/column-visibility",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/ColumnVisibility",
          element: <ColumnVisibilityPage />,
          label: translate("COLUMN_VISIBILITY"),
        },
        {
          name: "Editable",
          path: "/editable",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Editable",
          element: <EditablePage />,
          label: translate("EDITABLE"),
        },
        {
          name: "Ellipsis",
          path: "/ellipsis",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Ellipsis",
          element: <EllipsisPage />,
          label: "Ellipsis",
        },
        {
          name: "ExpandedLine",
          path: "/expand-line",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/ExpandedLine",
          element: <ExpandedLinePage />,
          label: translate("EXPAND_LINE"),
        },
        {
          name: "Export",
          path: "/export",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Export",
          element: <ExportPage />,
          label: translate("EXPORT"),
        },
        {
          name: "Favorites",
          path: "/favorites",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Favorites",
          element: <FavoritesPage />,
          label: translate("FAVORITES"),
        },
        {
          name: "Filter",
          path: "/filter",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Filter",
          element: <FilterPage />,
          label: translate("FILTER"),
        },
        {
          name: "Footer",
          path: "/footer",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Footer",
          element: <FooterPage />,
          label: translate("FOOTER"),
        },
        {
          name: "FullEditable",
          path: "/full-editable",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/FullEditable",
          element: <FullEditablePage />,
          label: translate("FULL_EDITABLE"),
        },
        {
          name: "Loading",
          path: "/loading",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Loading",
          element: <LoadingPage />,
          label: translate("LOADING"),
        },
        {
          name: "Pagination",
          path: "/pagination",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Pagination",
          element: <PaginationTablePage />,
          label: translate("PAGINATION"),
        },
        {
          name: "Resizing",
          path: "/resizing",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Resizing",
          element: <ResizingPage />,
          label: translate("RESIZING"),
        },
        {
          name: "Selection",
          path: "/selection",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Selection",
          element: <SelectionPage />,
          label: translate("SELECTION"),
        },
        {
          name: "Sort",
          path: "/sort",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Sort",
          element: <SortPage />,
          label: translate("SORT"),
        },
        {
          name: "Virtualized",
          path: "/virtualized",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <VirtualizedPage />,
          label: translate("VIRTUALIZED"),
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
          name: "TableMegaFavoritesPage",
          path: "/table-mega/favorites",
          implements_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Table",
          docs_code:
            "https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Table/Virtualized",
          element: <TableMegaFavoritesPage />,
          label: `Table Mega - Favorites`,
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
