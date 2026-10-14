import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FilterBirthday } from ".";

describe("components/Filter/FilterBirthday", () => {
  const createMockColumn = () =>
    ({
      setFilterValue: vi.fn(),
      getFilterValue: vi.fn(),
    }) as any;

  it("should open popover, fill from and to dates, and save", () => {
    const column = createMockColumn();
    render(<FilterBirthday column={column} />);

    // Click funnel trigger button to open
    const funnelButton = screen.getByRole("button");
    fireEvent.click(funnelButton);

    const fromInput = screen.getByLabelText("From");
    const toInput = screen.getByLabelText("To");

    fireEvent.change(fromInput, { target: { value: "2000-01-01" } });
    fireEvent.change(toInput, { target: { value: "2000-12-31" } });

    // Save button (last button)
    const buttons = screen.getAllByRole("button");
    const saveButton = buttons[buttons.length - 1];
    fireEvent.click(saveButton);

    expect(column.setFilterValue).toHaveBeenCalledWith({
      from: "2000-01-01",
      to: "2000-12-31",
    });
  });

  it("should clear date filters when clear button is clicked", () => {
    const column = createMockColumn();
    render(<FilterBirthday column={column} />);

    // Click funnel trigger button
    const funnelButton = screen.getByRole("button");
    fireEvent.click(funnelButton);

    const fromInput = screen.getByLabelText("From");
    fireEvent.change(fromInput, { target: { value: "01/01/2000" } });

    // Clear button (second button)
    const buttons = screen.getAllByRole("button");
    const clearButton = buttons[1];
    fireEvent.click(clearButton);

    expect(column.setFilterValue).toHaveBeenCalledWith(undefined);
  });
});
