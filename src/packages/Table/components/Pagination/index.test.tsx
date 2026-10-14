import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from ".";

vi.mock("~/hooks/useTranslation", () => ({
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
}));

describe("packages/Table/components/Pagination", () => {
  const createMockTable = (overrides = {}) =>
    ({
      setPageIndex: vi.fn(),
      previousPage: vi.fn(),
      nextPage: vi.fn(),
      setPageSize: vi.fn(),
      getCanPreviousPage: vi.fn(() => true),
      getCanNextPage: vi.fn(() => true),
      getPageCount: vi.fn(() => 5),
      state: {
        pagination: {
          pageIndex: 1,
          pageSize: 20,
        },
      },
      ...overrides,
    }) as any;

  it("should return null if pagination is not provided", () => {
    const { container } = render(
      <Pagination table={createMockTable()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render pagination and handle all button clicks and page size change", () => {
    const table = createMockTable();
    render(<Pagination table={table} pagination={{ disabledActions: false }} />);

    const buttons = screen.getAllByRole("button");
    // [0]: first page, [1]: prev, [2]: next, [3]: last
    fireEvent.click(buttons[0]);
    expect(table.setPageIndex).toHaveBeenCalledWith(0);

    fireEvent.click(buttons[1]);
    expect(table.previousPage).toHaveBeenCalledTimes(1);

    fireEvent.click(buttons[2]);
    expect(table.nextPage).toHaveBeenCalledTimes(1);

    fireEvent.click(buttons[3]);
    expect(table.setPageIndex).toHaveBeenCalledWith(4);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "50" } });
    expect(table.setPageSize).toHaveBeenCalledWith(50);
  });

  it("should disable buttons when canPrevious and canNext are false or actions disabled", () => {
    const table = createMockTable({
      getCanPreviousPage: () => false,
      getCanNextPage: () => false,
      getPageCount: () => 0,
    });

    render(<Pagination table={table} pagination={{ disabledActions: true }} />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });
});
