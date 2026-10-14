import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Expand } from "./";

type Any = any;

const mockSetOptions = vi.fn();
const mockRows: Any[] = [];

vi.mock("~/packages/TableMega/hooks", () => ({
  useTableMega: () => ({
    table: {
      setOptions: mockSetOptions,
      getRowModel: () => ({
        rows: mockRows,
      }),
    },
  }),
}));

vi.mock("../TrComplete", () => ({
  TrComplete: ({ row, enableEllipsis, parentTrProps }: Any) => (
    <tr data-testid={`tr-complete-${row.id}`}>
      <td>
        <span>{row.id}</span>
        <span data-testid={`ellipsis-${row.id}`}>
          {String(enableEllipsis)}
        </span>
        <span data-testid={`parent-props-${row.id}`}>
          {parentTrProps?.className || "none"}
        </span>
      </td>
    </tr>
  ),
}));

vi.mock("./ExpandRow", () => ({
  ExpandRow: ({ row, expandedTrProps }: Any) => (
    <tr data-testid={`expand-row-${row.id}`}>
      <td>{expandedTrProps?.className || "none"}</td>
    </tr>
  ),
}));

describe("packages/TableMega/components/Rows/Default/Expand", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockSetOptions.mockClear();
    mockRows.length = 0;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should configure getRowCanExpand and render rows with expanded and collapsed states", () => {
    mockRows.push(
      {
        id: "1",
        getIsExpanded: () => true,
      },
      {
        id: "2",
        getIsExpanded: () => false,
      }
    );

    render(
      <table>
        <tbody>
          <Expand
            enableEllipsis={true}
            parentTrProps={{ className: "parent-custom-class" }}
            expandedTrProps={{ className: "expanded-custom-class" }}
          />
        </tbody>
      </table>
    );

    expect(mockSetOptions).toHaveBeenCalled();
    // Execute the updater callback passed to setOptions
    const updater = mockSetOptions.mock.calls[0][0];
    const prevConfig = { existing: true };
    const newConfig = updater(prevConfig);
    expect(newConfig.existing).toBe(true);
    expect(newConfig.getRowCanExpand()).toBe(true);

    // Fast forward timeout to trigger setIsFirstRender
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId("tr-complete-1")).toBeInTheDocument();
    expect(screen.getByTestId("parent-props-1").textContent).toBe(
      "parent-custom-class"
    );
    expect(screen.getByTestId("parent-props-2").textContent).toBe("none");
  });
});
