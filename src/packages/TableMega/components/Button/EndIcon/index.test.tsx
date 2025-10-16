import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EndIcon } from ".";
import { TFeedbackProps } from "../types";

describe("packages/TableMega/components/Button/EndIcon", () => {
  const baseFeedback: TFeedbackProps = {
    loadingOptions: { isLoading: false },
    successOptions: { success: false },
    failedOptions: { failed: false },
  };

  it("renders div when children exist and no feedback states are active", () => {
    render(
      <EndIcon withFeedback={baseFeedback}>
        <span>Icon</span>
      </EndIcon>
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  it("returns null when there are no children", () => {
    const { container } = render(<EndIcon withFeedback={baseFeedback} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when loadingOptions.isLoading is true", () => {
    const feedback = {
      ...baseFeedback,
      loadingOptions: { isLoading: true },
    };
    const { container } = render(
      <EndIcon withFeedback={feedback}>
        <span>Loading</span>
      </EndIcon>
    );
    expect(container.firstChild).toBeNull();
  });

  it("returns null when successOptions.success is true", () => {
    const feedback = {
      ...baseFeedback,
      successOptions: { success: true },
    };
    const { container } = render(
      <EndIcon withFeedback={feedback}>
        <span>Success</span>
      </EndIcon>
    );
    expect(container.firstChild).toBeNull();
  });

  it("returns null when failedOptions.failed is true", () => {
    const feedback = {
      ...baseFeedback,
      failedOptions: { failed: true },
    };
    const { container } = render(
      <EndIcon withFeedback={feedback}>
        <span>Failed</span>
      </EndIcon>
    );
    expect(container.firstChild).toBeNull();
  });

  it("spreads additional props to the rendered div", () => {
    render(
      <EndIcon withFeedback={baseFeedback} data-testid="end-icon" title="icon">
        <span>Spread</span>
      </EndIcon>
    );
    const div = screen.getByTestId("end-icon");
    expect(div).toHaveAttribute("title", "icon");
  });
});
