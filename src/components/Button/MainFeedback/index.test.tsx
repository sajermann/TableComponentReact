import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MainFeedback } from ".";
import { TFeedbackProps } from "../types";

describe("components/Button/MainFeedback", () => {
  const baseFeedback: TFeedbackProps = {
    loadingOptions: { isLoading: false },
    successOptions: { success: false },
    failedOptions: { failed: false },
  };

  it("renders div when loadingOptions.isLoading is true", () => {
    const feedback = {
      ...baseFeedback,
      loadingOptions: { isLoading: true },
    };
    render(
      <MainFeedback withFeedback={feedback} data-testid="main-feedback" />
    );
    expect(screen.getByTestId("main-feedback")).toBeInTheDocument();
  });

  it("renders div when successOptions.success is true", () => {
    const feedback = {
      ...baseFeedback,
      successOptions: { success: true },
    };
    render(
      <MainFeedback withFeedback={feedback} data-testid="main-feedback" />
    );
    expect(screen.getByTestId("main-feedback")).toBeInTheDocument();
  });

  it("renders div when failedOptions.failed is true", () => {
    const feedback = {
      ...baseFeedback,
      failedOptions: { failed: true },
    };
    render(
      <MainFeedback withFeedback={feedback} data-testid="main-feedback" />
    );
    expect(screen.getByTestId("main-feedback")).toBeInTheDocument();
  });

  it("returns null when no feedback state is true", () => {
    render(<MainFeedback withFeedback={baseFeedback} />);
    expect(screen.queryByTestId("main-feedback")).toBeNull();
  });

  it("spreads additional props to the rendered div", () => {
    render(
      <MainFeedback
        withFeedback={{ ...baseFeedback, loadingOptions: { isLoading: true } }}
        data-testid="main-feedback"
        title="Main feedback"
      />
    );
    const div = screen.getByTestId("main-feedback");
    expect(div).toHaveAttribute("title", "Main feedback");
  });
});
