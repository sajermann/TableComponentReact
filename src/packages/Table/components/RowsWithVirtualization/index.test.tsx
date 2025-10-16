import { useVirtualizer } from "@tanstack/react-virtual";
import { render, screen } from "@testing-library/react";
import { RefObject } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RowsWithVirtualization } from ".";

vi.mock("@tanstack/react-virtual");

vi.mock("../ExpandLine", () => ({
  ExpandLine: vi.fn(() => <div data-testid="ExpandLine" />),
}));

vi.mock("../Tr", () => ({
  Tr: ({ children }: any) => <tr data-testid="Tr">{children}</tr>,
}));

vi.mock("../Td", () => ({
  Td: ({ children, title }: any) => (
    <td data-testid="Td" title={title}>
      {children}
    </td>
  ),
}));

const createMockRow = (
  id: string,
  expanded = false,
  cells: any[] = ["cell1", "cell2"]
) => ({
  id,
  getIsExpanded: () => expanded,
  getVisibleCells: () =>
    cells.map((value, index) => ({
      id: `cell-${index}`,
      column: {
        columnDef: {
          cell: () => value,
          meta: { align: "left" },
        },
      },
      getContext: () => ({
        getValue: () => value,
      }),
    })),
});

describe("packages/Table/components/RowsWithVirtualization", () => {
  const mockContainerRef: RefObject<HTMLDivElement> = {
    current: document.createElement("div"),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when virtualization is disabled", () => {
    vi.mocked(useVirtualizer).mockImplementation(
      () =>
        ({
          getVirtualItems: () => [],
          getTotalSize: () => 0,
        }) as any
    );
    const { container } = render(
      <RowsWithVirtualization
        rows={[]}
        enableVirtualization={false}
        tableContainerRef={mockContainerRef}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders padding rows and virtual rows with expand line", () => {
    const rows: any = [
      createMockRow("row1", true),
      createMockRow("row2", false),
    ];

    const virtualItems = [
      { index: 0, start: 10, end: 78 },
      { index: 1, start: 79, end: 147 },
    ];

    vi.mocked(useVirtualizer).mockImplementation(
      () =>
        ({
          getVirtualItems: () => virtualItems,
          getTotalSize: () => 200,
        }) as any
    );

    const expandRow: any = {
      parentTrProps: { "data-expanded": "true" },
    };

    render(
      <table>
        <tbody>
          <RowsWithVirtualization
            rows={rows}
            enableVirtualization={true}
            expandRow={expandRow}
            tableContainerRef={mockContainerRef}
          />
        </tbody>
      </table>
    );

    // The padding top row
    const paddingTopRow = screen.getAllByRole("row")[0];
    expect(paddingTopRow.querySelector("td")?.style.height).toBe("10px");

    // // The rendered virtualized rows
    // const trs = screen.getAllByTestId("Tr");
    // expect(trs.length).toBe(2);
    // // The first row should have the expanded attribute passed
    // expect(trs[0]).toHaveAttribute("data-expanded", "true");

    // Each row should have Td cells
    const tds = screen.getAllByTestId("Td");
    expect(tds.length).toBeGreaterThanOrEqual(2);

    // ExpandLine should be rendered for each row
    const expandLines = screen.getAllByTestId("ExpandLine");
    expect(expandLines.length).toBe(2);
  });

  it("renders padding bottom row when paddingBottom > 0", () => {
    vi.mocked(useVirtualizer).mockImplementation(
      () =>
        ({
          getVirtualItems: () => [{ index: 0, start: 0, end: 50 }],
          getTotalSize: () => 100,
        }) as any
    );

    const rows: any = [createMockRow("row1")];

    render(
      <table>
        <tbody>
          <RowsWithVirtualization
            rows={rows}
            enableVirtualization={true}
            tableContainerRef={mockContainerRef}
          />
        </tbody>
      </table>
    );

    const rowsRendered = screen.getAllByRole("row");
    const paddingBottomRow = rowsRendered[rowsRendered.length - 1];
    expect(paddingBottomRow.querySelector("td")?.style.height).toBe("50px");
  });
});
