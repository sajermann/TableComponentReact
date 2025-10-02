import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Tfoot } from ".";

// Mocks
vi.mock("@tanstack/react-table", () => ({
  flexRender: vi.fn(() => "Footer Renderizado"),
}));
vi.mock("~/packages/Table/utils/managerClassNames", () => ({
  managerClassNames: vi.fn((obj: Record<string, boolean>) =>
    Object.keys(obj)
      .filter((key) => obj[key])
      .join(" ")
  ),
}));
const mockGetFooterGroups = vi.fn();

vi.mock("../../hooks", () => ({
  useTableMega: () => ({
    table: { getFooterGroups: mockGetFooterGroups },
  }),
}));

describe("packages/TableMega/components/Tfoot", () => {
  beforeEach(() => {
    mockGetFooterGroups.mockReset();
    // (require("@tanstack/react-table").flexRender as any).mockClear();
  });

  it("renderiza o grupo de footers corretamente", () => {
    mockGetFooterGroups.mockReturnValue([
      {
        id: "fg1",
        headers: [
          {
            id: "h1",
            colSpan: 1,
            isPlaceholder: false,
            getContext: () => ({
              column: {
                columnDef: {
                  footer: "Footer1",
                  meta: { align: "center" },
                },
              },
            }),
            column: {
              columnDef: {
                footer: "Footer1",
                meta: { align: "center" },
              },
            },
          },
          {
            id: "h2",
            colSpan: 2,
            isPlaceholder: true,
            getContext: () => ({
              column: {
                columnDef: {
                  footer: "Footer2",
                  meta: { align: "right" },
                },
              },
            }),
            column: {
              columnDef: {
                footer: "Footer2",
                meta: { align: "right" },
              },
            },
          },
        ],
      },
    ]);
    const { getByRole, getAllByRole } = render(<Tfoot />);

    // Checa se o <tfoot> está presente
    expect(getByRole("rowgroup")).toBeInTheDocument();

    // Checa se <tr> e <th> renderizam corretamente
    expect(getAllByRole("row")).toHaveLength(1);
    const ths = getAllByRole("columnheader");
    expect(ths).toHaveLength(2);

    expect(ths[0]).toHaveStyle({ textAlign: "center" });
    expect(ths[0].getAttribute("colSpan")).toBe("1");
    expect(ths[0].textContent).toContain("Footer Renderizado");

    // Placeholder deve estar vazio
    expect(ths[1]).toHaveStyle({ textAlign: "right" });
    expect(ths[1].getAttribute("colSpan")).toBe("2");
    expect(ths[1].textContent).toBe("");
  });

  it("renderiza múltiplos grupos de footer", () => {
    mockGetFooterGroups.mockReturnValue([
      {
        id: "fg-a",
        headers: [
          {
            id: "h-a1",
            colSpan: 1,
            isPlaceholder: false,
            getContext: () => ({
              column: {
                columnDef: { footer: "F-a1", meta: { align: "left" } },
              },
            }),
            column: { columnDef: { footer: "F-a1", meta: { align: "left" } } },
          },
        ],
      },
      {
        id: "fg-b",
        headers: [
          {
            id: "h-b1",
            colSpan: 1,
            isPlaceholder: false,
            getContext: () => ({
              column: {
                columnDef: { footer: "F-b1", meta: { align: "right" } },
              },
            }),
            column: { columnDef: { footer: "F-b1", meta: { align: "right" } } },
          },
        ],
      },
    ]);
    const { getAllByRole } = render(<Tfoot />);
    expect(getAllByRole("row")).toHaveLength(2);
  });
});
