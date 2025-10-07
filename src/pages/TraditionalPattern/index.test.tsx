import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TraditionalPattern } from ".";

vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => {
      const dict: Record<string, string> = {
        TRADITIONAL_PATTERN: "Traditional Pattern",
      };
      return dict[key] ?? key;
    },
  }),
}));

// Mock Section component to render title and children
vi.mock("~/components", () => ({
  CenterOptions: () => <div data-testid="section-title" />,
}));

describe("pages/TraditionalPattern", () => {
  it("render component 1", () => {
    render(<TraditionalPattern />);
    expect(screen.getByText("Traditional Pattern")).toBeInTheDocument();
  });
});
