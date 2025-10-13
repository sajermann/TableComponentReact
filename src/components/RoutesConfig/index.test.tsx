import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { usePagesConfig } from "~/hooks";
import { RoutesConfig } from ".";

import { Breadcrumbs } from "./Breadcumbs";
import { Sidebar } from "./Sidebar";

vi.mock("~/hooks");

vi.mock("@tanstack/react-router", () => ({
  Outlet: () => <div>Outlet Test</div>,
}));

vi.mock(import("~/components"), async (importOriginal) => {
  const mod = await importOriginal(); // type is inferred
  return {
    ...mod,
    Version: () => <div>Version Test</div>, // Não consigo mockar pelo vi.mocked quando função exportada como constant
    Config: () => <div>Config Test</div>,
  } as any;
});

vi.mock("./Breadcumbs");
vi.mock("./Sidebar");

describe("components/RoutesConfig", () => {
  it("renders render corretly", () => {
    vi.mocked(usePagesConfig).mockImplementation(() => {});
    vi.mocked(Breadcrumbs).mockImplementation(() => (
      <div>Breadcrumbs Test</div>
    ));
    vi.mocked(Sidebar).mockImplementation(() => <div>Sidebar Test</div>);

    const { getByText } = render(<RoutesConfig />);

    expect(getByText("Breadcrumbs Test")).toBeInTheDocument();
    expect(getByText("Outlet Test")).toBeInTheDocument();
    expect(getByText("Sidebar Test")).toBeInTheDocument();
    expect(getByText("Version Test")).toBeInTheDocument();
    expect(getByText("Config Test")).toBeInTheDocument();
  });
});
