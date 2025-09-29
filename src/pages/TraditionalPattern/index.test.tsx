import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TraditionalPattern } from ".";

vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (label: string) => label.toUpperCase(), // Simples transformação para visualização
  }),
}));

describe("pages/TraditionalPattern", () => {
  it("render component", () => {
    render(<TraditionalPattern />);
    expect(screen.queryByText("TRADITIONAL_PATTERN")).not.toBeInTheDocument();
  });
});
