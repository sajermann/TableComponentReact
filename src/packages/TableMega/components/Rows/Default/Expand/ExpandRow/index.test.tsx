import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ExpandRow } from ".";
import { useTableMega } from "../../../../../hooks";

type Any = any;

// Mock Tr
vi.mock("../../../../Tr", () => ({
  Tr: ({ children }: Any) => <tr data-testid="Tr">{children}</tr>,
}));

// Mock useTableMega
vi.mock("../../../../../hooks", () => ({
  useTableMega: vi.fn(),
}));

const mockRow = (
  opts: Partial<{ expanded: boolean; cellCount: number }> = {}
) => ({
  getIsExpanded: () => !!opts.expanded,
  getVisibleCells: () => Array(opts.cellCount ?? 2).fill({}),
});

// Dummy expanded component
const DummyComponent = () => (
  <div data-testid="dummy">Expanded Content for Row</div>
);

describe("packages/TableMega/components/Rows/Default/Expand/ExpandRow", () => {
  it("renders nothing if row is not expanded", () => {
    (useTableMega as Any).mockReturnValue({
      expandedComponent: <DummyComponent />,
    });
    render(<ExpandRow row={mockRow({ expanded: false }) as Any} />);
    expect(screen.queryByTestId("Tr")).toBeNull();
  });

  it("renders nothing if expandedComponent is not a valid React element", () => {
    (useTableMega as Any).mockReturnValue({
      expandedComponent: null,
    });
    render(<ExpandRow row={mockRow({ expanded: true }) as Any} />);
    expect(screen.queryByTestId("Tr")).toBeNull();
  });

  it("renders Tr with correct colSpan and passes row to expandedComponent", () => {
    (useTableMega as Any).mockReturnValue({
      expandedComponent: <DummyComponent />,
    });

    render(
      <ExpandRow row={mockRow({ expanded: true, cellCount: 3 }) as Any} />
    );
    const tr = screen.getByTestId("Tr");
    expect(tr).toBeInTheDocument();

    const td = tr.querySelector("td");
    expect(td).not.toBeNull();
    expect(td?.getAttribute("colSpan")).toBe("3");

    // Check that DummyComponent rendered inside td
    expect(screen.getByTestId("dummy")).toBeInTheDocument();
  });
});
