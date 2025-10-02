import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TableMegaDefaultPage } from ".";
// Mock useTranslation hook
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => {
      const dict: Record<string, string> = { DEFAULT: "Default" };
      return dict[key] ?? key;
    },
  }),
  useColumns: () => ({
    // Provide basic mock columns structure
    columns: [
      { id: "col1", header: "Header 1", accessorKey: "col1" },
      { id: "col2", header: "Header 2", accessorKey: "col2" },
    ],
  }),
}));

// Mock makeData.person to return mock data
vi.mock("~/utils", () => ({
  makeData: {
    person: (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i.toString(),
        col1: `Value1-${i}`,
        col2: `Value2-${i}`,
      }));
    },
  },
}));

// Mock TableMega components to simply render their children or mark presence
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

// Mock Section component to render title and children
vi.mock("~/components", () => ({
  Section: ({ title, children }: any) => (
    <section>
      <h1 data-testid="section-title">{title}</h1>
      {children}
    </section>
  ),
}));

describe("pages/TableMega/Default/TableMegaDefaultPage", () => {
  it("renders the complete TableMega structure with translated title", () => {
    render(<TableMegaDefaultPage />);

    expect(screen.getByTestId("section-title").textContent).toBe("Default");
    expect(screen.getByTestId("root")).toBeInTheDocument();
    expect(screen.getByTestId("table")).toBeInTheDocument();
    expect(screen.getByTestId("thead")).toBeInTheDocument();
    expect(screen.getByTestId("tbody")).toBeInTheDocument();
    expect(screen.getByTestId("rows")).toBeInTheDocument();
  });
});
