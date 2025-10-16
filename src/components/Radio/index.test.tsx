import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, RadioItem } from ".";

describe("components/Radio", () => {
  it("renders children inside RadioGroupPrimitive.Root", () => {
    render(
      <RadioGroup
        onValueChange={() => {}}
        className="custom-group"
        defaultValue="val1"
      >
        <div data-testid="child">Child Content</div>
      </RadioGroup>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    const root = screen.getByTestId("child").parentElement;
    expect(root).toHaveClass("custom-group");
  });

  it("calls onValueChange handler on selection change", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange} defaultValue="val1">
        <RadioItem value="val1" />
        <RadioItem value="val2" />
      </RadioGroup>
    );

    const secondItem = screen.getAllByRole("radio")[1];
    fireEvent.click(secondItem);
    expect(onValueChange).toHaveBeenCalledWith("val2");
  });

  it("renders RadioGroupPrimitive.Item with correct props", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange} defaultValue="val1">
        <RadioItem value="test" id="radio-1" />
      </RadioGroup>
    );
    const radio = screen.getByRole("radio");
    expect(radio).toHaveAttribute("id", "radio-1");
    expect(radio).toHaveAttribute("value", "test");
    expect(radio).not.toBeDisabled();
  });

  it("sets disabled attribute when disabled prop is true", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange} defaultValue="val1">
        <RadioItem value="disabled" disabled />
      </RadioGroup>
    );
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("applies error color variant when iserror is true", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange} defaultValue="val1">
        <RadioItem value="error" iserror />
      </RadioGroup>
    );
    const radio = screen.getByRole("radio");
    // Since classNames are dynamic and Tailwind based,
    // we check for classes related to error styling presence in class attribute
    expect(radio.className).toMatch(/red-500/);
  });

  // it("merges className in itemProps and indicatorProps correctly", () => {
  //   const onValueChange = vi.fn();
  //   render(
  //     <RadioGroup onValueChange={onValueChange} defaultValue="val1">
  //       <RadioItem
  //         value="custom"
  //         itemProps={{ className: "custom-item" }}
  //         indicatorProps={{ className: "custom-indicator" }}
  //       />
  //     </RadioGroup>
  //   );
  //   const radio = screen.getByRole("radio");
  //   expect(radio.className).toContain("custom-item");
  //   // The indicator is nested child, check presence by class
  //   const indicator = radio.querySelector("[class*='custom-indicator']");
  //   expect(indicator).toBeInTheDocument();
  // });

  it("applies default colorStyle as primary when not specified", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange} defaultValue="val1">
        <RadioItem value="defaultColor" />
      </RadioGroup>
    );
    const radio = screen.getByRole("radio");
    expect(radio.className).toMatch(/blue-500/);
  });

  it("applies specified colorStyle correctly", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange} defaultValue="val1">
        <RadioItem value="blackColor" colorStyle="black" />
      </RadioGroup>
    );
    const radio = screen.getByRole("radio");
    expect(radio.className).toMatch(/black/);
  });
});
