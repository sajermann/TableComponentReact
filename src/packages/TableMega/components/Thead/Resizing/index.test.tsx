import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Resizing } from ".";

const createHeader: any = ({
  canResize = true,
  isResizing = false,
  resizeHandler = vi.fn(),
} = {}) => ({
  column: {
    getCanResize: vi.fn(() => canResize),
    getIsResizing: vi.fn(() => isResizing),
  },
  getResizeHandler: vi.fn(() => resizeHandler),
});

describe("packages/TableMega/components/Resizing", () => {
  // Description: Test that Resizing does not render when resizing is not allowed.
  it("does not render if resizing is not allowed", () => {
    const header = createHeader({ canResize: false });
    const { container } = render(<Resizing header={header} />);
    expect(container.firstChild).toBeNull();
  });

  // Description: Test that Resizing renders and has correct class when not resizing.
  it("renders resizer when resizing is allowed", () => {
    const header = createHeader({ canResize: true, isResizing: false });
    const { container } = render(<Resizing header={header} />);
    const resizer = container.firstChild as HTMLElement;
    expect(resizer).toBeTruthy();
    expect(resizer.className).toContain("resizer");
    expect(resizer.className).not.toContain("isResizing");
  });

  // Description: Test that Resizing detects the resizing state with a different CSS class.
  it("adds isResizing class when resizing", () => {
    const header = createHeader({ canResize: true, isResizing: true });
    const { container } = render(<Resizing header={header} />);
    const resizer = container.firstChild as HTMLElement;
    expect(resizer.className).toContain("isResizing");
  });

  // Description: Test that mouse and touch events call the resize handler.
  it("calls the resize handler when interacted", () => {
    const resizeHandler = vi.fn();
    const header = createHeader({
      canResize: true,
      isResizing: false,
      resizeHandler,
    });
    const { container } = render(<Resizing header={header} />);
    const resizer = container.firstChild as HTMLElement;

    fireEvent.mouseDown(resizer);
    fireEvent.touchStart(resizer);
    expect(resizeHandler).toHaveBeenCalledTimes(2);
  });
});
