import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RowsWithoutSort } from ".";

// Description: Mock ThWithoutSort to check prop passing and mounting.
vi.mock("../ThWithoutSort", () => ({
  ThWithoutSort: (props: any) => (
    <td data-testid="th-without-sort">{props.header.id}</td>
  ),
}));

const mockGetHeaderGroups = vi.fn();

vi.mock("~/packages/TableMega/hooks", () => ({
  useTableMega: () => ({
    table: { getHeaderGroups: mockGetHeaderGroups },
  }),
}));
describe("packages/TableMega/components/Resizing", () => {
  beforeEach(() => {
    mockGetHeaderGroups.mockReset();
  });

  // Description: Ensures one <tr> is rendered with two headers.
  it("renders rows and headers correctly", () => {
    mockGetHeaderGroups.mockReturnValue([
      {
        id: "hg1",
        headers: [{ id: "header1" }, { id: "header2" }],
      },
    ]);
    const { getAllByRole, getAllByTestId } = render(<RowsWithoutSort />);

    // Checks <tr> presence
    expect(getAllByRole("row")).toHaveLength(1);

    // Checks the ThWithoutSort being rendered twice with correct header ids
    const ths = getAllByTestId("th-without-sort");
    expect(ths).toHaveLength(2);
    expect(ths[0].textContent).toBe("header1");
    expect(ths[1].textContent).toBe("header2");
  });

  // Description: Renders multiple header groups.
  it("renders multiple header groups", () => {
    mockGetHeaderGroups.mockReturnValue([
      { id: "hgA", headers: [{ id: "A1" }] },
      { id: "hgB", headers: [{ id: "B1" }, { id: "B2" }] },
    ]);
    const { getAllByRole, getAllByTestId } = render(<RowsWithoutSort />);
    expect(getAllByRole("row")).toHaveLength(2);
    expect(getAllByTestId("th-without-sort")).toHaveLength(3);
  });

  // Description: Handles empty headers gracefully.
  it("renders nothing if no header groups", () => {
    mockGetHeaderGroups.mockReturnValue([]);
    const { container } = render(<RowsWithoutSort />);
    expect(container.firstChild).toBeNull();
  });
});
