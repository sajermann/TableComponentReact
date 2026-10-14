import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ColumnVisibilitySelector } from ".";

describe("components/ColumnVisibilitySelector", () => {
  const options = [
    { id: "col1", label: "Column 1", show: true },
    { id: "col2", label: "Column 2", show: false },
  ];

  it("should render checkboxes and trigger handleCheck on click", () => {
    const handleCheck = vi.fn();
    render(
      <ColumnVisibilitySelector
        options={options}
        handleCheck={handleCheck}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(2);

    expect(screen.getByLabelText("Column 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Column 2")).toBeInTheDocument();

    fireEvent.click(checkboxes[0]);
    expect(handleCheck).toHaveBeenCalledWith({
      id: "col1",
      value: false,
    });
  });
});
