import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TableMegaFullEditablePage } from ".";
// Mock translation hook
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => {
      const dict: Record<string, string> = {
        FULL_EDITABLE: "Editable by Row",
        IMPLEMENTS_FULL_EDITABLE_MODE: "Implements editable mode",
      };
      return dict[key] ?? key;
    },
  }),
}));

// Mock useEditableByRow hook
vi.mock("./hooks", () => ({
  useFullEditable: () => ({
    columns: [
      { id: "col1", header: "Header 1", accessorKey: "col1" },
      { id: "col2", header: "Header 2", accessorKey: "col2" },
    ],
    data: [
      { col1: "Data 1", col2: "Data 2" },
      { col1: "Data 3", col2: "Data 4" },
    ],
    handleFormSubmit: vi.fn(),
  }),
}));

// Mock TableMega components
vi.mock("~/packages/TableMega", () => ({
  Root: ({ children }: any) => <div data-testid="root">{children}</div>,
  Table: ({ children }: any) => <table data-testid="table">{children}</table>,
  Thead: { Sort: () => <thead data-testid="thead" /> },
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
  Button: (props: any) => {
    <button {...props} />;
  },
  JsonViewer: (props: any) => <span>{JSON.stringify({ props })}</span>,
}));

describe("pages/TableMega/TableMegaFullEditablePage", () => {
  it("renders the section with translated title and description text", () => {
    const screen = render(<TableMegaFullEditablePage />);
    expect(screen.getByTestId("section-title").textContent).toBe(
      "Editable by Row"
    );
  });

  it("renders form containing TableMega structure", () => {
    const screen = render(<TableMegaFullEditablePage />);
    expect(screen.getByTestId("root")).toBeInTheDocument();
    expect(screen.getByTestId("table")).toBeInTheDocument();
    expect(screen.getByTestId("thead")).toBeInTheDocument();
    expect(screen.getByTestId("tbody")).toBeInTheDocument();
    expect(screen.getByTestId("rows")).toBeInTheDocument();
  });
});
