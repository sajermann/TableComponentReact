import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CloseButton } from "./";

vi.mock("@radix-ui/react-popover", () => ({
  Close: ({ children, onClick, ...props }: any) => (
    <button data-testid="close-button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe("components/Popover/components/CloseButton", () => {
  it("should render nothing when show is false", () => {
    const { container } = render(<CloseButton show={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render component and trigger onClose when clicked", () => {
    const onClose = vi.fn();
    render(<CloseButton show onClose={onClose} />);

    const button = screen.getByTestId("close-button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
