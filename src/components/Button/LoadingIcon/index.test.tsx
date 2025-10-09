import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LoadingIcon } from ".";
import { Icons } from "../../Icons";

vi.mock("../../Icons");

describe("components/Button/LoadingIcon/", () => {
  it("should render icon points", () => {
    vi.mocked(Icons).mockImplementation(() => (
      <div data-testid="loadingPoints" />
    ));

    const { getByTestId } = render(
      <LoadingIcon
        withFeedback={{
          loadingOptions: {
            isLoading: true,
            typeLoadingIcon: "Points",
          },
        }}
      />
    );
    expect(getByTestId("loadingPoints")).toBeInTheDocument();
  });

  it("should render icon circle", () => {
    vi.mocked(Icons).mockImplementation(() => (
      <div data-testid="loadingCircle" />
    ));

    const { getByTestId } = render(
      <LoadingIcon
        withFeedback={{
          loadingOptions: {
            isLoading: true,
          },
        }}
      />
    );
    expect(getByTestId("loadingCircle")).toBeInTheDocument();
  });

  it("should render custom icon", () => {
    vi.mocked(Icons).mockImplementation(() => <div />);
    const { getByTestId } = render(
      <LoadingIcon
        withFeedback={{
          loadingOptions: {
            isLoading: true,
            customIcon: <div data-testid="customIcon" />,
          },
        }}
      />
    );
    expect(getByTestId("customIcon")).toBeInTheDocument();
  });

  it("should render custom icon", () => {
    vi.mocked(Icons).mockImplementation(() => <div data-testid="null" />);
    const { queryByTestId } = render(
      <LoadingIcon
        withFeedback={{
          loadingOptions: {
            isLoading: false,
          },
        }}
      />
    );
    expect(queryByTestId("null")).toBeNull();
  });
});
