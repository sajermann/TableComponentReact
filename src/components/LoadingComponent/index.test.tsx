import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useLoadingLazy, useTranslation } from "~/hooks";
import { LoadingComponent } from ".";

// Mock the translation hook
vi.mock("~/hooks");

describe("components/LoadingComponent", () => {
  it("renders options with translated headers and correct structure", () => {
    vi.mocked(useTranslation).mockImplementation(
      () => ({ translate: (key: string) => key || "" }) as any
    );
    vi.mocked(useLoadingLazy).mockImplementation(
      () => ({ setIsLoadingLazy: () => {} }) as any
    );

    const { getByText } = render(<LoadingComponent />);

    expect(getByText("DATA_IS_LOADING_PLEASE_WAITING")).toBeInTheDocument();
  });
});
