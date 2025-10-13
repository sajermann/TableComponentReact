import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useHomePage } from "~/hooks/useHomePage";
import { Config } from ".";
import { SwitchLanguage } from "../SwitchLanguage";
import { SwitchTheme } from "../SwitchTheme";

vi.mock("../SwitchTheme");
vi.mock("../SwitchLanguage");
vi.mock("~/Version");
vi.mock("~/hooks/useHomePage");

describe("components/Layout", () => {
  it("renders render corretly", () => {
    vi.mocked(SwitchTheme).mockImplementation(() => <div>Theme Test</div>);
    vi.mocked(SwitchLanguage).mockImplementation(() => (
      <div>Language Test</div>
    ));
    vi.mocked(useHomePage).mockImplementation(() => ({ isHomePage: true }));

    const { getByText } = render(<Config />);
    expect(getByText("Theme Test")).toBeInTheDocument();
    expect(getByText("Language Test")).toBeInTheDocument();
  });
});
