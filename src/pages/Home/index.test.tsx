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
    // Mockando Link como uma função para sobrescrever nos testes
    Link: vi.fn(),
    useLocation: vi.fn(),
  };
});

describe("pages/Home", () => {
  it("render component", () => {
    render(
      <InjectorProviders>
        <Home />
      </InjectorProviders>
    );
    expect(screen.queryByText("welcome")).not.toBeInTheDocument();
  });
});
