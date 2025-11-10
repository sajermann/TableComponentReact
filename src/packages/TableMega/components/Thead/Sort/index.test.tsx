import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTableMega } from "~/packages/TableMega/hooks";
import { Sort, TSortProps } from ".";

type Any = any;

vi.mock("~/packages/TableMega/hooks");

vi.mock("../RowsWithSort", () => ({
  RowsWithSort: () => <div data-testid="RowsWithSort" />,
}));

vi.mock("../THeadDefaultInternal", () => ({
  THeadDefaultInternal: ({ children, ...props }: Any) => (
    <thead data-testid="THeadDefaultInternal" {...props}>
      {children}
    </thead>
  ),
}));

describe("packages/TableMega/components/Thead/Sort", () => {
  it("sets sorting state and options when controlled", () => {
    const mockSetState = vi.fn();
    const mockSetOptions = vi.fn();
    vi.mocked(useTableMega).mockImplementation(
      () =>
        ({
          table: {
            setState: (e: Any) => {
              console.log(e());
              mockSetState(e());
            },
            setOptions: (ee: Any) => {
              console.log(ee());
              mockSetOptions(ee());
            },
          },
        }) as Any
    );
    const controlledProps: TSortProps["controlled"] = {
      sort: [{ id: "name", desc: false }],
      setSort: vi.fn(),
    };

    render(<Sort controlled={controlledProps} />);
    expect(mockSetState).toBeCalledWith({
      sorting: [{ id: "name", desc: false }],
    });
  });

  it("renders THeadDefaultInternal and RowsWithSort controlled", () => {
    render(<Sort data-testid="head" />);
    expect(screen.getByTestId("head")).toBeInTheDocument();
    expect(screen.getByTestId("RowsWithSort")).toBeInTheDocument();
  });

  it("renders THeadDefaultInternal and RowsWithSort", () => {
    render(
      <Sort data-testid="head" controlled={{ sort: [], setSort: vi.fn() }} />
    );
    expect(screen.getByTestId("head")).toBeInTheDocument();
    expect(screen.getByTestId("RowsWithSort")).toBeInTheDocument();
  });
});
