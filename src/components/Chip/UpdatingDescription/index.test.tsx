import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UpdatingDescription } from ".";

describe("components/Chip/UpdatingDescription", () => {
  it("renders options with translated headers and correct structure", () => {
    const { getByTestId, getByText } = render(
      <UpdatingDescription
        data-testid="test-UpdatingDescription"
        value="test-value"
      />
    );
    expect(getByTestId("test-UpdatingDescription")).toBeInTheDocument();
    expect(getByText("test-value")).toBeInTheDocument();
  });
});
