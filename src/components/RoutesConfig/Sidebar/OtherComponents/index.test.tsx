import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useOtherComponents } from "~/hooks";
import { OtherComponents } from ".";

vi.mock("@tanstack/react-router", () => ({
  Link: (props: any) => <a {...props} />,
}));

vi.mock("~/hooks");

describe("components/RoutesConfig/Sidebar/OtherComponents", () => {
  it("should not render html", () => {
    vi.mocked(useOtherComponents).mockReturnValue({
      otherComponents: {
        next: null,
        prev: null,
      },
    } as any);
    const { queryByText } = render(<OtherComponents />);
    expect(queryByText("OTHERS_COMPONENTS")).toBeFalsy();
  });

  it("should render html", () => {
    vi.mocked(useOtherComponents).mockReturnValue({
      otherComponents: {
        next: {
          label: "TEST_NEXT",
        },
        prev: {
          label: "TEST_PREV",
        },
      },
    } as any);
    const { queryByText } = render(<OtherComponents />);
    expect(queryByText("TEST_PREV")).toBeTruthy();
    expect(queryByText("TEST_NEXT")).toBeTruthy();
  });
});
