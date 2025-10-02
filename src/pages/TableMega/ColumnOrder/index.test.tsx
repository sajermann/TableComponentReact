import * as reactRouter from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useBreadcrumbs } from "~/hooks/useBreadcrumbs";
import { TableMegaColumnOrderPage } from ".";

// vi.mock("~/hooks", () => ({
//   useTranslation: () => ({
//     translate: (label: string) => label.toUpperCase(), // Simples transformação para visualização
//   }),
// }));
// vi.mock("~/hooks/useBreadcrumbs");
// vi.mock("@tanstack/react-router", async () => {
//   return {
//     // Mockando Link como uma função para sobrescrever nos testes
//     Link: vi.fn(),
//     useLocation: vi.fn(),
//   };
// });

describe("pages/TableMega/ColumnOrder/TableMegaColumnOrderPage", () => {
  it("render breadcrumbs correctly", () => {
    render(<TableMegaColumnOrderPage />);
  });
});
