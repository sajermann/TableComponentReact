import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Default } from ".";

// Description: Mock THeadDefaultInternal to expose its props and children.
vi.mock("../THeadDefaultInternal", () => ({
  THeadDefaultInternal: ({ children, ...rest }: any) => (
    <thead data-testid="thead-internal" {...rest}>
      {children}
    </thead>
  ),
}));

// Description: Mock RowsWithoutSort to render a marker.
vi.mock("../RowsWithoutSort", () => ({
  RowsWithoutSort: () => <tr data-testid="rows-without-sort" />,
}));

describe("packages/TableMega/components/Default", () => {
  // Description: Renders the table head and includes RowsWithoutSort.
  it("renders RowsWithoutSort inside THeadDefaultInternal", () => {
    const screen = render(<Default />);
    expect(screen.getByTestId("thead-internal")).toBeInTheDocument();
    expect(screen.getByTestId("rows-without-sort")).toBeInTheDocument();
  });

  // Description: Renders children correctly after RowsWithoutSort.
  it("renders children after RowsWithoutSort", () => {
    const screen = render(
      <Default>
        <tr data-testid="child-row" />
      </Default>
    );
    const thead = screen.getByTestId("thead-internal");
    const children = Array.from(thead.children);

    // The first child is RowsWithoutSort mock, second is the custom child.
    expect(children[0]).toHaveAttribute("data-testid", "rows-without-sort");
    expect(children[1]).toHaveAttribute("data-testid", "child-row");
  });

  // Description: Forwards HTML props to THeadDefaultInternal.
  it("forwards native props to THeadDefaultInternal", () => {
    const screen = render(<Default id="test-thead" aria-label="thead-label" />);
    const thead = screen.getByTestId("thead-internal");
    expect(thead).toHaveAttribute("id", "test-thead");
    expect(thead).toHaveAttribute("aria-label", "thead-label");
  });
});
