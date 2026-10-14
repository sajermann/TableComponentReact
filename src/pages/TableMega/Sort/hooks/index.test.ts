import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTableMegaSortPage } from ".";

vi.mock("~/hooks", () => ({
  useColumns: () => ({
    columns: [{ accessorKey: "name", header: "Name" }],
  }),
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
}));

describe("pages/TableMega/Sort/hooks", () => {
  it("should return columns and execute friends accessorFn and cell", () => {
    const { result } = renderHook(() => useTableMegaSortPage());

    expect(result.current.columns).toHaveLength(2);

    const friendsCol = result.current.columns[1] as any;
    expect(friendsCol.header).toBe("FRIENDS");

    // Test accessorFn
    const formatted = friendsCol.accessorFn({
      friends: [{ name: "Alice" }, { name: "Bob" }],
    });
    expect(formatted).toBe("Alice | Bob");

    // Test cell
    const cellValue = friendsCol.cell({
      getValue: () => "Alice | Bob",
    });
    expect(cellValue).toBe("Alice | Bob");
  });
});
