import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PopoverBase } from "./";

type Any = any;

vi.mock("~/components/Popover", () => ({
  Popover: ({ children, trigger, onClose, onInteractOutside }: Any) => (
    <div data-testid="popover-wrapper">
      {trigger}
      {children}
      <button data-testid="mock-onclose" onClick={onClose}>
        Close
      </button>
      <button
        data-testid="mock-oninteractoutside"
        onClick={onInteractOutside}
      >
        Interact Outside
      </button>
    </div>
  ),
}));

describe("components/Filter/PopoverBase", () => {
  it("should render trigger button and open popover on click", () => {
    const setIsOpen = vi.fn();
    const onSave = vi.fn();
    const onClear = vi.fn();

    const { rerender } = render(
      <PopoverBase
        isOpen={false}
        setIsOpen={setIsOpen}
        funnelFilled={false}
        onSave={onSave}
        onClear={onClear}
      >
        <div>Popover Content</div>
      </PopoverBase>
    );

    const triggerButton = screen.getAllByRole("button")[0];
    fireEvent.click(triggerButton);
    expect(setIsOpen).toHaveBeenCalledWith(true);

    // Rerender with funnelFilled = true
    rerender(
      <PopoverBase
        isOpen={false}
        setIsOpen={setIsOpen}
        funnelFilled={true}
        onSave={onSave}
        onClear={onClear}
      >
        <div>Popover Content</div>
      </PopoverBase>
    );
  });

  it("should render content, handle onClear, onSave, onClose and onInteractOutside", () => {
    const setIsOpen = vi.fn();
    const onSave = vi.fn();
    const onClear = vi.fn();

    render(
      <PopoverBase
        isOpen={true}
        setIsOpen={setIsOpen}
        funnelFilled={true}
        onSave={onSave}
        onClear={onClear}
      >
        <div>Popover Content</div>
      </PopoverBase>
    );

    expect(screen.getByText("Popover Content")).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    // Trigger is buttons[0], clear is buttons[1], save is buttons[2]
    const clearButton = buttons[1];
    const saveButton = buttons[2];

    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(setIsOpen).toHaveBeenCalledWith(false);

    fireEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(setIsOpen).toHaveBeenCalledWith(false);

    // Test onClose callback
    fireEvent.click(screen.getByTestId("mock-onclose"));
    expect(setIsOpen).toHaveBeenCalledWith(false);

    // Test onInteractOutside callback
    fireEvent.click(screen.getByTestId("mock-oninteractoutside"));
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});
