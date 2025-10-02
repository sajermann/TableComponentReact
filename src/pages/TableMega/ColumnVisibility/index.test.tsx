/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TableMegaColumnVisibilityPage } from ".";

const mockOptions = [
  { id: "id", label: "Id", show: true },
  { id: "avatar", label: "Avatar", show: true },
  { id: "name", label: "Name", show: true },
];

const mockColumns = [
  { id: "id", header: "ID Header" },
  { id: "avatar", header: "Avatar Header" },
  { id: "name", header: "Name Header" },
];

// Mock useTranslation hook
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => {
      const dict: Record<string, string> = {
        COLUMN_VISIBILITY: "Column Visibility",
        IMPLEMENTS_COLUMN_VISIBILITY_MODE: "Implements column visibility mode",
        COLUMN_VISIBILITY_WITH_STATE_FULLY_CONTROLLED:
          "Column visibility with fully controlled state",
      };
      return dict[key] ?? key;
    },
  }),
  useColumnVisibility: () => ({
    columnVisibility: { id: true, avatar: true, name: true },
    columns: mockColumns,
    handleCheck: vi.fn(),
    options: mockOptions,
  }),
  useColumns: () => ({
    columns: mockColumns,
  }),
}));

// Mock makeData.person for data generation
vi.mock("~/utils", () => ({
  makeData: {
    person: (count: number) => {
      return Array.from({ length: count }).map((_, i) => ({
        id: String(i),
        avatar: `Avatar ${i}`,
        name: `Name ${i}`,
      }));
    },
  },
}));

// Mock TableMega components to simple renderers with test ids
vi.mock("~/packages/TableMega", () => ({
  Root: ({ children }: any) => <div data-testid="root">{children}</div>,
  Table: ({ children }: any) => <table data-testid="table">{children}</table>,
  Thead: () => <thead data-testid="thead" />,
  Tbody: ({ children }: any) => <tbody data-testid="tbody">{children}</tbody>,
  Rows: () => (
    <tr data-testid="rows">
      <td>Row content</td>
    </tr>
  ),
}));

// Mock ColumnVisibilitySelector
vi.mock("~/components/ColumnVisibilitySelector", () => ({
  ColumnVisibilitySelector: ({ options }: any) => (
    <div data-testid="col-visibility-selector">{options.length} options</div>
  ),
}));

// Mock Section component
vi.mock("~/components/Section", () => ({
  Section: ({ title, children }: any) => (
    <section>
      <h1 data-testid="section-title">{title}</h1>
      {children}
    </section>
  ),
}));

describe("pages/TableMega/TableMegaColumnVisibilityPage", () => {
  it("renders translated title and descriptive texts", () => {
    const screen = render(<TableMegaColumnVisibilityPage />);
    expect(screen.getByTestId("section-title").textContent).toBe(
      "Column Visibility"
    );

    expect(
      screen.getByText("Implements column visibility mode")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Column visibility with fully controlled state")
    ).toBeInTheDocument();
  });

  it("renders ColumnVisibilitySelector and TableMega components", () => {
    const screen = render(<TableMegaColumnVisibilityPage />);

    expect(screen.getByTestId("col-visibility-selector")).toBeInTheDocument();
    expect(screen.getByTestId("root")).toBeInTheDocument();
    expect(screen.getByTestId("table")).toBeInTheDocument();
    expect(screen.getByTestId("thead")).toBeInTheDocument();
    expect(screen.getByTestId("tbody")).toBeInTheDocument();
    expect(screen.getByTestId("rows")).toBeInTheDocument();
  });
});
