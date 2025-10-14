import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useHomePage } from "~/hooks/useHomePage";
import { Sidebar } from ".";
import { Config } from "./Config";
import { Credits } from "./Credits";
import { OtherComponents } from "./OtherComponents";
import { TableOfContents } from "./TableOfContents";

vi.mock("~/hooks/useHomePage");
vi.mock("./Credits");
vi.mock("./Config");
vi.mock("./OtherComponents");
vi.mock("./TableOfContents");

describe("components/RoutesConfig/Sidebar", () => {
  it(`should not render component`, () => {
    vi.mocked(useHomePage).mockReturnValue({ isHomePage: true });
    vi.mocked(Config).mockImplementation(() => <div>Config Test</div>);
    const { queryByText } = render(<Sidebar />);
    const result = queryByText("Config Test");
    expect(result).toBeFalsy();
  });

  it(`should render component`, async () => {
    vi.mocked(useHomePage).mockReturnValue({ isHomePage: false });
    vi.mocked(Config).mockImplementation(() => <div>Config Test</div>);
    vi.mocked(Credits).mockImplementation(() => <div>Credits Test</div>);
    vi.mocked(TableOfContents).mockImplementation(() => (
      <div>TableOfContents Test</div>
    ));
    vi.mocked(OtherComponents).mockImplementation(() => (
      <div>OtherComponents Test</div>
    ));
    const { findByText } = render(<Sidebar />);
    const configResult = await findByText("Config Test");
    const creditsResult = await findByText("Credits Test");
    const tableOfContentsResult = await findByText("TableOfContents Test");
    const otherComponentsResult = await findByText("OtherComponents Test");
    expect(configResult).toBeTruthy();
    expect(creditsResult).toBeTruthy();
    expect(tableOfContentsResult).toBeTruthy();
    expect(otherComponentsResult).toBeTruthy();
  });
});
