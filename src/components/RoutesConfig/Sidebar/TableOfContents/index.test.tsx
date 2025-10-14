import { useLocation } from "@tanstack/react-router";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TableOfContents } from ".";
import { buildOptions, scrollToSection } from "./utils";

vi.mock("@tanstack/react-router");
vi.mock("./utils");

describe("components/RoutesConfig/Sidebar/TableOfContents", () => {
  it("render correctly", async () => {
    vi.mocked(useLocation).mockImplementation(
      () => ({ location: "test" }) as any
    );
    const dataMock = [
      {
        type: "H2",
        anchor: "/test-anchor",
        active: true,
        title: "Test - Anchor",
        top: 1,
      },
    ];
    vi.mocked(buildOptions).mockReturnValue(dataMock);
    const spy = vi.fn();
    vi.mocked(scrollToSection).mockImplementation(spy);
    const { findByText } = render(<TableOfContents />);
    const result = await findByText(dataMock[0].title);
    expect(result).toBeTruthy();
    fireEvent.click(result);
    expect(spy).toBeCalledWith(dataMock[0].anchor);
  });
});
