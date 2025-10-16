import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StartIcon } from ".";

describe("components/Button/StartIcon", () => {
  it("should render component", () => {
    render(
      <StartIcon>
        <div data-testid="Test-StartIcon">Test</div>
      </StartIcon>
    );
    expect(screen.getByTestId("Test-StartIcon")).toBeInTheDocument();
  });

  it("should not render component", () => {
    const { queryByTestId } = render(<StartIcon />);
    expect(queryByTestId("Test-StartIcon")).toBeFalsy();
  });
});
