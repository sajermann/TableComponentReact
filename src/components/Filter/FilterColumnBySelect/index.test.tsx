import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FilterColumnBySelect } from ".";

describe("components/Filter/FilterColumnBySelect", () => {
  const createMockTable = (rows: any[]) =>
    ({
      getCoreRowModel: () => ({
        flatRows: rows.map((original) => ({ original })),
      }),
    }) as any;

  const createMockColumn = (filterValue: unknown = undefined) => {
    let current = filterValue;
    return {
      getFilterValue: vi.fn(() => current),
      setFilterValue: vi.fn((val) => {
        current = val;
      }),
    } as any;
  };

  it("should open popover, select options, unselect option and save", () => {
    const column = createMockColumn();
    const table = createMockTable([
      { role: "Admin", id: "1" },
      { role: "User", id: "2" },
      { role: 123 as any, id: "3" }, // non-string to cover fallback branch
    ]);

    render(
      <FilterColumnBySelect
        column={column}
        table={table}
        propForFilter="role"
      />
    );

    // Open popover by clicking funnel trigger
    const funnelButton = screen.getByRole("button");
    fireEvent.click(funnelButton);

    const adminCheckbox = screen.getByLabelText("Admin");
    const userCheckbox = screen.getByLabelText("User");

    // Check Admin
    fireEvent.click(adminCheckbox);
    // Check User
    fireEvent.click(userCheckbox);
    // Uncheck Admin
    fireEvent.click(adminCheckbox);

    // Click save (last button)
    const buttons = screen.getAllByRole("button");
    const saveButton = buttons[buttons.length - 1];
    fireEvent.click(saveButton);

    expect(column.setFilterValue).toHaveBeenCalledWith(["User"]);
  });

  it("should clear filter value when clear is clicked", () => {
    const column = createMockColumn(["User"]);
    const table = createMockTable([{ role: "User" }]);

    render(
      <FilterColumnBySelect
        column={column}
        table={table}
        propForFilter="role"
      />
    );

    const funnelButton = screen.getByRole("button");
    fireEvent.click(funnelButton);

    // Click trash/clear (second button)
    const buttons = screen.getAllByRole("button");
    const clearButton = buttons[1];
    fireEvent.click(clearButton);

    expect(column.setFilterValue).toHaveBeenCalledWith(undefined);
  });
});
