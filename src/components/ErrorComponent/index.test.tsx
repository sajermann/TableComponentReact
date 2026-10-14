import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorComponent } from ".";
import { Button } from "../Button";

// Mock the translation hook
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => key || "",
  }),
}));

vi.mock("../Button");

describe("components/ErrorComponent", () => {
  it("renders options with translated headers and correct structure", () => {
    vi.mocked(Button).mockImplementation((props: any) => (
      <button onClick={props.onClick}>{props.children}</button>
    ));
    const { getByText } = render(
      <ErrorComponent
        error={{
          message: "Test error",
          name: "Test",
        }}
      />
    );

    expect(getByText("Test error")).toBeInTheDocument();
  });

  it("triggers reload on button click", () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: reloadMock },
    });

    vi.mocked(Button).mockImplementation((props: any) => (
      <button onClick={props.onClick}>{props.children}</button>
    ));

    render(
      <ErrorComponent
        error={{
          message: "Test error",
          name: "Test",
        }}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
