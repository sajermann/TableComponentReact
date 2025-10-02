import * as reactRouter from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useBreadcrumbs } from "~/hooks/useBreadcrumbs";
import { Breadcrumbs } from ".";

vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (label: string) => label.toUpperCase(), // Simples transformação para visualização
  }),
}));
vi.mock("~/hooks/useBreadcrumbs");
vi.mock("@tanstack/react-router", async () => {
  return {
    // Mockando Link como uma função para sobrescrever nos testes
    Link: vi.fn(),
    useLocation: vi.fn(),
  };
});

describe("components/routesConfig/Breadcrumbs", () => {
  it("render breadcrumbs correctly", () => {
    vi.mocked(reactRouter.Link).mockImplementation((props: any) => (
      <a {...props} />
    ));
    vi.mocked(reactRouter.useLocation).mockImplementation(
      () =>
        ({
          pathname: "/about",
        }) as any
    );

    vi.mocked(useBreadcrumbs).mockImplementation(() => ({
      breadcrumbs: [
        { label: "home", link: "/" },
        { label: "about", link: "/about" },
        { label: "contact", link: null },
      ],
      setBreadcrumbs: vi.fn(),
    }));

    render(<Breadcrumbs />);
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("ABOUT")).toBeInTheDocument();
    expect(screen.getByText("CONTACT")).toBeInTheDocument();
  });

  it("dont render if breadcrumbs is empty", () => {
    vi.mocked(useBreadcrumbs).mockImplementation(() => ({
      breadcrumbs: [],
      setBreadcrumbs: vi.fn(),
    }));
    render(<Breadcrumbs />);
    expect(screen.queryByText("HOME")).not.toBeInTheDocument();
  });

  it("dont render if path is root", () => {
    vi.mocked(reactRouter.useLocation).mockImplementation(
      () =>
        ({
          pathname: "/",
        }) as any
    );

    render(<Breadcrumbs />);
    expect(screen.queryByText("HOME")).not.toBeInTheDocument();
  });
});
