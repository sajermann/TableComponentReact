import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TableMegaPage } from ".";

vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (label: string) => label.toUpperCase(), // Simples transformação para visualização
  }),
}));

describe("pages/TableMega", () => {
  it("render component", () => {
    render(<TableMegaPage />);
    expect(screen.queryByText("COMPOSITION_PATTERN")).not.toBeInTheDocument();
  });
});
