import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TableMegaSortPage } from ".";
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
vi.mock("./components", () => ({
  Automatic: () => <div data-testid="automatic" />,
  Manual: () => <div data-testid="manual" />,
  Disabled: () => <div data-testid="disabled" />,
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

describe("pages/TableMega/TableMegaLoadingPage", () => {
  it("renders form containing TableMega structure", () => {
    const screen = render(<TableMegaSortPage />);
    expect(screen.getByTestId("section-title").textContent).toBe(
      "Table Mega - Sort"
    );
    expect(screen.getByTestId("automatic")).toBeInTheDocument();
    expect(screen.getByTestId("manual")).toBeInTheDocument();
    expect(screen.getByTestId("disabled")).toBeInTheDocument();
  });
});
