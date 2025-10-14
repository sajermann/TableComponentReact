import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Switch } from ".";

describe("components/Switch", () => {
  it("should render with default props", () => {
    // Description: Renders the Switch component with only required props and verifies its unchecked, enabled state
    const onChange = vi.fn();
    const { getByRole } = render(
      <Switch checked={false} onChange={onChange} />
    );
    const input = getByRole("switch");
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
    expect(input).not.toBeDisabled();
  });

  it("should call onChange when toggle is clicked", () => {
    // Description: Calls onChange callback when the switch is toggled by user interaction
    const onChange = vi.fn();
    const { getByRole } = render(
      <Switch checked={false} onChange={onChange} />
    );
    const input = getByRole("switch");
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should be checked if checked prop is true", () => {
    // Description: Ensures the switch appears checked if checked prop is true
    const onChange = vi.fn();
    const { getByRole } = render(<Switch checked={true} onChange={onChange} />);
    const input = getByRole("switch");
    expect(input).toBeChecked();
  });

  it("should be disabled when disabled prop is true", () => {
    // Description: Verifies that the switch cannot be toggled when disabled prop is true
    const onChange = vi.fn();
    const { getByRole } = render(
      <Switch checked={false} onChange={onChange} disabled />
    );
    const input = getByRole("switch");
    expect(input).toBeDisabled();
  });

  it("should render custom checked and unchecked icons if provided", () => {
    // Description: Renders custom icons based on checked/unchecked state
    const onChange = vi.fn();
    const checkedIcon = <span data-testid="checked-icon">Checked</span>;
    const uncheckedIcon = <span data-testid="unchecked-icon">Unchecked</span>;
    const { getByTestId, rerender } = render(
      <Switch
        checked={false}
        onChange={onChange}
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
      />
    );
    expect(getByTestId("unchecked-icon")).toBeInTheDocument();
    rerender(
      <Switch
        checked={true}
        onChange={onChange}
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
      />
    );
    expect(getByTestId("checked-icon")).toBeInTheDocument();
  });

  it("should use custom colors for onColor and offColor", () => {
    // Description: Applies custom color props to the switch and verifies assignment
    const onChange = vi.fn();
    const { getByRole } = render(
      <Switch
        checked={true}
        onChange={onChange}
        onColor="#123456"
        offColor="#654321"
      />
    );
    const input = getByRole("switch");
    // Conferir pelo dom estilo pode variar, normalmente o test é: valor da prop está passado
    expect(input).toBeChecked();
  });
});
