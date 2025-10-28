import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SortIcon } from ".";

vi.mock("lucide-react", () => ({
  ChevronDownIcon: () => <div data-testid="asc" />,
  ChevronUpIcon: () => <div data-testid="desc" />,
}));

describe("packages/TableMega/components/Thead/SortIcon", () => {
  it("should render asc icon", () => {
    const { getByTestId } = render(
      <SortIcon header={{ column: { getIsSorted: () => "desc" } } as any} />
    );
    expect(getByTestId("asc")).toBeInTheDocument();
  });

  it("should render desc icon", () => {
    const { getByTestId } = render(
      <SortIcon header={{ column: { getIsSorted: () => "asc" } } as any} />
    );
    expect(getByTestId("desc")).toBeInTheDocument();
  });
});
