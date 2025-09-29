import * as reactRouter from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CenterOptions } from ".";

// Mock the translation hook
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => key || "",
  }),
}));

// Mock the Link component from react-router
vi.mock("@tanstack/react-router", () => ({
  Link: vi.fn(),
  useRouter: vi.fn(),
}));

describe("components/CenterOptions", () => {
  beforeEach(() => {
    // Setup Link mock as simple anchor for rendering
    vi.mocked(reactRouter.Link).mockImplementation((props: any) => (
      <a {...props} />
    ));
  });

  it("renders options with translated headers and correct structure", () => {
    const options = [
      {
        staticData: { routerName: "home" },
        path: "/home",
        className: "custom-class",
      },
      {
        staticData: { routerName: "profile" },
        path: "/profile",
      },
      {
        staticData: { routerName: "" },
        path: "/not-found",
      },
    ];

    render(<CenterOptions options={options} />);

    // Expect translated header texts
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("profile")).toBeInTheDocument();
  });
});
