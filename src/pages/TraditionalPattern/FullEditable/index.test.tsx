import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FullEditablePage } from ".";
// Mock useTranslation hook
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => {
      const dict: Record<string, string> = {
        FULL_EDITABLE: "FULL_EDITABLE",
      };
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
vi.mock("~/packages/Table", () => ({
  Table: () => <table data-testid="table" />,
}));

// Mock Section component to render title and children
vi.mock("~/components", () => ({
  Section: ({ title, children }: any) => (
    <section>
      <h1 data-testid="section-title">{title}</h1>
      {children}
    </section>
  ),
  JsonViewer: () => <div>Json Viewer</div>,
}));

describe("pages/TraditionalPattern/FullEditablePage", () => {
  it("renders the complete Table structure with translated title", () => {
    render(<FullEditablePage />);

    expect(screen.getByTestId("section-title").textContent).toBe(
      "FULL_EDITABLE"
    );
    expect(screen.getByTestId("table")).toBeInTheDocument();
  });
});
