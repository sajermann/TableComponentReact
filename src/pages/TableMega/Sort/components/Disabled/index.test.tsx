import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Disabled } from ".";
// Mock translation hook
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => {
      const dict: Record<string, string> = {
        DISABLED_SORT: "DISABLED_SORT",
      };
      return dict[key] ?? key;
    },
  }),
  useColumns: () => ({
    columns: [
      { id: "col1", header: "Header 1", accessorKey: "col1" },
      { id: "col2", header: "Header 2", accessorKey: "col2" },
    ],
  }),
}));

// Mock TableMega components
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

// Mock Section component
vi.mock("~/components", () => ({
  Section: ({ title, children }: any) => (
    <section>
      <h1 data-testid="section-title">{title}</h1>
      {children}
    </section>
  ),
}));

describe("pages/TableMega/TableMegaLoadingPage/Sort/components/Disabled", () => {
  it("renders form containing TableMega structure", () => {
    const screen = render(<Disabled columns={[]} data={[]} />);
    expect(screen.getByTestId("section-title").textContent).toBe(
      "DISABLED_SORT"
    );
    expect(screen.getByTestId("root")).toBeInTheDocument();
    expect(screen.getByTestId("table")).toBeInTheDocument();
    expect(screen.getByTestId("thead")).toBeInTheDocument();
    expect(screen.getByTestId("tbody")).toBeInTheDocument();
  });
});
