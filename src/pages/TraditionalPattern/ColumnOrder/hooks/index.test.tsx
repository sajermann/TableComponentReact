import { act, render, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useColumnOrder } from ".";

// Mocks for hooks and components
vi.mock("~/hooks", () => ({
  useColumns: () => ({
    columns: Array(8)
      .fill(null)
      .map((_, i) => ({
        id: `col${i}`,
        accessorKey: `key${i}`,
      })),
  }),
  useTranslation: () => ({
    translate: (key: string) => {
      const dictionary: Record<string, string> = {
        NAME: "Name",
        LAST_NAME: "Last Name",
        BIRTHDAY: "Birthday",
        ACTIVE: "Active",
      };
      return dictionary[key] ?? key;
    },
  }),
}));

vi.mock("~/components/ColumnOrderSelector", () => ({
  ColumnOrderSelector: (props: any) => {
    // Mock component just renders a div with props.value
    return <div data-testid="column-order-selector">{props.value}</div>;
  },
}));

vi.mock("../utils", () => ({
  handleChangeOrder: vi.fn(),
}));

import { handleChangeOrder } from "../utils";

describe("pages/TableMega/ColumnOrder/utils/hooks/useColumnOrder", () => {
  it("initializes columnOrder with translated content", () => {
    const { result } = renderHook(() => useColumnOrder());

    expect(result.current.columnOrder).toEqual([
      { id: "id", content: "Id" },
      { id: "avatar", content: "Avatar" },
      { id: "name", content: "Name" },
      { id: "lastName", content: "Last Name" },
      { id: "birthday", content: "Birthday" },
      { id: "email", content: "Email" },
      { id: "role", content: "Role" },
      { id: "isActive", content: "Active" },
    ]);
  });

  it("returns columns array with ColumnOrderSelector header renderers", () => {
    const { result } = renderHook(() => useColumnOrder());
    const columns = result.current.columns;
    expect(columns).toHaveLength(8);

    columns.forEach((col, index) => {
      // Render the header component and check it contains the expected content value
      const headerFn = col.header! as any;
      const mockHeader = { index };
      const { getAllByTestId } = render(
        headerFn({ header: mockHeader } as any)
      );
      const selectors = getAllByTestId("column-order-selector");
      const selector = selectors.find(
        (item) => item.textContent === result.current.columnOrder[index].content
      );
      expect(selector).toBeTruthy();
    });
  });

  it("calls handleChangeOrder on ColumnOrderSelector onChange for all columns", () => {
    const { result } = renderHook(() => useColumnOrder());

    // We'll simulate "Role" change on each column to cover all headers
    result.current.columns.forEach((col, index) => {
      const headerFn = col.header as any;
      const mockHeader = { index };

      const rendered = headerFn({ header: mockHeader } as any);
      const onChange = rendered.props.onChange;

      act(() => {
        onChange("Role");
      });

      expect(handleChangeOrder).toHaveBeenCalledWith({
        currentId: result.current.columnOrder[index].id,
        targetId: "role",
        columnOrder: result.current.columnOrder,
        setColumnOrder: expect.any(Function),
      });
    });

    // Check handleChangeOrder was called the correct number of times (once per column)
    expect(handleChangeOrder).toHaveBeenCalledTimes(
      result.current.columns.length
    );
  });
});
