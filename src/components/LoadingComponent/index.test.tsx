import * as reactRouter from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoadingComponent } from ".";

// Mock the translation hook
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => key || "",
  }),
}));

describe("components/LoadingComponent", () => {
  it("renders options with translated headers and correct structure", () => {
    const { getByText } = render(<LoadingComponent />);

    expect(getByText("DATA_IS_LOADING_PLEASE_WAITING")).toBeInTheDocument();
  });
});
