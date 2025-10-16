import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTableMega } from "~/packages/TableMega/hooks";
import { Sort, TSortProps } from ".";

vi.mock("~/packages/TableMega/hooks", () => ({
  useTableMega: vi.fn(),
}));

vi.mock("../RowsWithSort", () => ({
  RowsWithSort: () => <div data-testid="RowsWithSort" />,
}));

vi.mock("../THeadDefaultInternal", () => ({
  THeadDefaultInternal: ({ children, ...props }: any) => (
    <thead data-testid="THeadDefaultInternal" {...props}>
      {children}
    </thead>
  ),
}));

describe("packages/TableMega/components/Thead/Sort", () => {
  const mockTable = {
    setOptions: vi.fn(),
    setState: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useTableMega as any).mockReturnValue({
      table: mockTable,
    });
  });

  // it("sets getSortedRowModel option when uncontrolled", () => {
  //   render(<Sort />);
  //   expect(mockTable.setOptions).toHaveBeenCalledTimes(1);
  //   expect(mockTable.setOptions).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       getSortedRowModel: expect.any(Function),
  //     })
  //   );
  // });

  // it("sets sorting state and options when controlled", () => {
  //   const controlledProps: TSortProps["controlled"] = {
  //     sort: [{ id: "name", desc: false }],
  //     setSort: vi.fn(),
  //   };

  //   render(<Sort controlled={controlledProps} />);
  //   expect(mockTable.setState).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       sorting: controlledProps.sort,
  //     })
  //   );

  //   expect(mockTable.setOptions).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       onSortingChange: controlledProps.setSort,
  //     })
  //   );
  // });

  it("renders THeadDefaultInternal and RowsWithSort", () => {
    render(<Sort data-testid="head" />);
    expect(screen.getByTestId("head")).toBeInTheDocument();
    expect(screen.getByTestId("RowsWithSort")).toBeInTheDocument();
  });
});
