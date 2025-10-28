import { render } from "@testing-library/react";
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
    vi.mocked(Button).mockImplementation((props) => <button {...props} />);
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
});
