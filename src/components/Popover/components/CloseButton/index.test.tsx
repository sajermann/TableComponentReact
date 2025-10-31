import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CloseButton } from "./";

vi.mock("@radix-ui/react-popover", () => ({
  Close: () => <div data-testid="close-button" />,
}));

describe("components/Popover/components/CloseButton", () => {
  it("should render component", () => {
    const { getByTestId } = render(<CloseButton show />);
    expect(getByTestId("close-button")).toBeInTheDocument;
  });
});
