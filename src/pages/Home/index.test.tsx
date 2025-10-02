import * as reactRouter from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InjectorProviders } from "~/components";
import { Home } from ".";

vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (label: string) => label.toUpperCase(), // Simples transformação para visualização
  }),
}));

vi.mock("@tanstack/react-router", async () => {
  return {
    Link: vi.fn(),
    useLoaderData: vi.fn(),
  };
});

describe("pages/Home", () => {
  it("render component", () => {
    vi.mocked(reactRouter.useLoaderData).mockImplementation(() => ({
      options: [{ path: "/test" }],
    }));
    render(<Home />);
    expect(screen.queryByText("welcome")).not.toBeInTheDocument();
  });
});
