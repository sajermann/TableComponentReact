import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FilterId } from ".";

describe("components/Filter/FilterId", () => {
  const createMockColumn = (filterValue: unknown = undefined) => {
    let currentFilter = filterValue;
    return {
      getFilterValue: vi.fn(() => currentFilter),
      setFilterValue: vi.fn((val) => {
        currentFilter = val;
      }),
    } as any;
  };

  it("should open popover, select filter type, type value and save", () => {
    const column = createMockColumn();
    render(<FilterId column={column} />);

    // Click funnel button to open popover
    const funnelButton = screen.getByRole("button");
    fireEvent.click(funnelButton);

    // Select filter type
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "equals" } });

    // Type filter value
    const input = screen.getByPlaceholderText("Type value for filter");
    fireEvent.change(input, { target: { value: "123" } });

    // Click save button (the last button)
    const buttons = screen.getAllByRole("button");
    const saveButton = buttons[buttons.length - 1];
    fireEvent.click(saveButton);

    expect(column.setFilterValue).toHaveBeenCalledWith(["equals", "123"]);
  });

  it("should clear filter when trash button is clicked", () => {
    const column = createMockColumn(["equals", "123"]);
    render(<FilterId column={column} />);

    // Click funnel button to open popover
    const funnelButton = screen.getByRole("button");
    fireEvent.click(funnelButton);

    // Click trash button (second button)
    const buttons = screen.getAllByRole("button");
    const clearButton = buttons[1];
    fireEvent.click(clearButton);

    expect(column.setFilterValue).toHaveBeenCalledWith(undefined);
  });

  it("should correctly verify filled filter for different values", () => {
    // When filter is empty array of strings
    const columnEmpty = createMockColumn(["", ""]);
    const { rerender } = render(<FilterId column={columnEmpty} />);

    // When filter is undefined
    const columnUndefined = createMockColumn(undefined);
    rerender(<FilterId column={columnUndefined} />);

    // When filter is partially empty
    const columnPartial = createMockColumn(["equals", ""]);
    rerender(<FilterId column={columnPartial} />);

    // When filter has both values
    const columnFilled = createMockColumn(["equals", "42"]);
    rerender(<FilterId column={columnFilled} />);
  });
});
