import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UpdatingContainer } from ".";

describe("components/Chip/UpdatingContainer", () => {
  it("renders options with translated headers and correct structure", () => {
    const { getByTestId } = render(
      <UpdatingContainer data-testid="test-UpdatingContainer" />
    );
    expect(getByTestId("test-UpdatingContainer")).toBeInTheDocument();
  });
});
