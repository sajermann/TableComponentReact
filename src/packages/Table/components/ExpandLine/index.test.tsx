// __tests__/ExpandLine.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ExpandLine } from ".";

type Any = any;

// Mock Tr component used inside ExpandLine
vi.mock("../Tr", () => ({
  Tr: ({ children, ...props }: Any) => (
    <tr data-testid="tr-mock" {...props}>
      {children}
    </tr>
  ),
}));

// Helper mock for Row with relevant methods
function createMockRow({ isExpanded, visibleCellsCount = 1 }: Any): Any {
  return {
    getIsExpanded: () => isExpanded,
    getVisibleCells: () => new Array(visibleCellsCount),
    index: 0,
  };
}

describe("packages/Table/components/ExpandLine", () => {
  it("should render null if row is not expanded", () => {
    const row = createMockRow({ isExpanded: false });
    const { container } = render(<ExpandLine row={row} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render expanded row content when row is expanded", () => {
    const row = createMockRow({ isExpanded: true, visibleCellsCount: 3 });
    const expandedTrProps = { "data-expanded": "true" };
    const expandedContentText = "Expanded Content";

    const expandRow: Any = {
      expandedTrProps,
      render: () => <div>{expandedContentText}</div>,
    };

    render(<ExpandLine row={row} expandRow={expandRow} />);

    const trElement = screen.getByTestId("tr-mock");
    expect(trElement).toBeInTheDocument();
    expect(trElement).toHaveAttribute("data-expanded", "true");

    const tdElement = trElement.querySelector("td");
    expect(tdElement).toHaveAttribute("colspan", "3");
    expect(tdElement).toHaveTextContent(expandedContentText);
  });

  it("should handle when expandRow is undefined", () => {
    const row = createMockRow({ isExpanded: true, visibleCellsCount: 2 });
    const { container } = render(<ExpandLine row={row} />);
    expect(container.querySelector("tr")).toBeInTheDocument();
    const td = container.querySelector("td");
    expect(td).toHaveAttribute("colspan", "2");
    expect(td).toBeEmptyDOMElement();
  });
});
