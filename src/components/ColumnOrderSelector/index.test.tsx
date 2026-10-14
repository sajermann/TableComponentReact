import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ColumnOrderSelector } from ".";

describe("components/ColumnOrderSelector", () => {
  const options = [
    { id: "1", content: "Option 1" },
    { id: "2", content: "Option 2" },
  ];

  it("should render options and handle change", () => {
    const onChange = vi.fn();
    render(
      <ColumnOrderSelector
        optionsList={options}
        onChange={onChange}
        value="Option 1"
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "Option 2" } });
    expect(onChange).toHaveBeenCalledWith("Option 2");
  });

  it("should render with defaultValue", () => {
    const onChange = vi.fn();
    render(
      <ColumnOrderSelector
        optionsList={options}
        onChange={onChange}
        defaultValue="Option 1"
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("Option 1");
  });
});
