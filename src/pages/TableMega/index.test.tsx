import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TableMegaPage } from ".";

vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (label: string) => label.toUpperCase(),
  }),
}));

vi.mock("@tanstack/react-router", async () => {
  return {
    Link: vi.fn(),
    useLoaderData: vi.fn(),
  };
});

vi.mock("~/config/routes", async () => {
  return {
    compositionChilds: [
      { staticData: { routerName: "mocked1" }, path: "/mocked1" },
      { staticData: { routerName: "mocked2" }, path: "/mocked2" },
    ],
  };
});

describe("pages/TableMega", () => {
  it("render component 1", () => {
    render(<TableMegaPage />);
    expect(screen.getByText("MOCKED1")).toBeInTheDocument();
    expect(screen.getByText("MOCKED2")).toBeInTheDocument();
  });
});
