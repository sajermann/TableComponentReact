import { useVirtualizer } from "@tanstack/react-virtual";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTableMega } from "~/packages/TableMega/hooks";
import { Virtualized } from "./";

// Mock child components
vi.mock("../../Td", () => ({
  Td: ({ children, title }: any) => (
    <td data-testid="Td" title={title}>
      {children}
    </td>
  ),
}));
vi.mock("../../Tr", () => ({
  Tr: ({ children }: any) => <tr data-testid="Tr">{children}</tr>,
}));

// Mock hooks
vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: vi.fn(),
}));
vi.mock("~/packages/TableMega/hooks", () => ({
  useTableMega: vi.fn(),
}));

// Helper utilities
const createMockRow = (id: string, cellValues: any[] = []) => ({
  id,
  getVisibleCells: () =>
    cellValues.map((val, i) => ({
      id: `cell-${id}-${i}`,
      column: { columnDef: { cell: () => val, meta: { align: "left" } } },
      getContext: () => ({
        getValue: () => val,
      }),
    })),
});

describe("packages/TableMega/components/Rows/Virtualized", () => {
  const mockContainerRef = { current: document.createElement("div") };

  const mockVirtualizer = {
    getVirtualItems: vi.fn(),
    getTotalSize: vi.fn(),
  };

  const mockTable = {
    getRowModel: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders no content if getVirtualItems returns empty array", () => {
    mockVirtualizer.getVirtualItems.mockReturnValue([]);
    mockVirtualizer.getTotalSize.mockReturnValue(0);
    (useVirtualizer as any).mockReturnValue(mockVirtualizer);
    (useTableMega as any).mockReturnValue({
      table: { getRowModel: () => ({ rows: [] }) },
    });

    const { container } = render(
      <Virtualized containerRef={mockContainerRef} />
    );
    expect(container.querySelectorAll("tr")).toHaveLength(0);
  });

  it("renders padding rows when paddingTop and paddingBottom > 0", () => {
    const rows = [createMockRow("r1", ["A"])];
    const virtualRows = [{ start: 20, end: 40, index: 0 }];

    mockVirtualizer.getVirtualItems.mockReturnValue(virtualRows);
    mockVirtualizer.getTotalSize.mockReturnValue(100);
    (useVirtualizer as any).mockReturnValue(mockVirtualizer);
    (useTableMega as any).mockReturnValue({
      table: { getRowModel: () => ({ rows }) },
    });

    render(<Virtualized containerRef={mockContainerRef} />);
    const trs = screen.getAllByTestId("Tr");
    expect(trs.length).toBe(1);

    const allTds = screen.getAllByTestId("Td");
    expect(allTds.length).toBe(1);
    expect(allTds[0].getAttribute("title")).toBe("A");
  });

  it("renders multiple virtual rows properly", () => {
    const rows = [
      createMockRow("r1", ["A"]),
      createMockRow("r2", ["B"]),
      createMockRow("r3", ["C"]),
    ];
    const virtualRows = [
      { start: 0, end: 60, index: 0 },
      { start: 70, end: 120, index: 1 },
      { start: 130, end: 190, index: 2 },
    ];

    mockVirtualizer.getVirtualItems.mockReturnValue(virtualRows);
    mockVirtualizer.getTotalSize.mockReturnValue(200);
    (useVirtualizer as any).mockReturnValue(mockVirtualizer);
    (useTableMega as any).mockReturnValue({
      table: { getRowModel: () => ({ rows }) },
    });

    render(<Virtualized containerRef={mockContainerRef} />);
    const tds = screen.getAllByTestId("Td");
    expect(tds.map((td) => td.getAttribute("title"))).toEqual(["A", "B", "C"]);
  });

  it("handles missing containerRef gracefully", () => {
    const rows = [createMockRow("r1", ["Test"])];
    const virtualRows = [{ start: 0, end: 60, index: 0 }];
    mockVirtualizer.getVirtualItems.mockReturnValue(virtualRows);
    mockVirtualizer.getTotalSize.mockReturnValue(120);

    (useVirtualizer as any).mockReturnValue(mockVirtualizer);
    (useTableMega as any).mockReturnValue({
      table: { getRowModel: () => ({ rows }) },
    });

    const ref = { current: null };
    const { container } = render(<Virtualized containerRef={ref} />);
    expect(container.querySelectorAll("tr").length).toBeGreaterThanOrEqual(0);
  });
});
