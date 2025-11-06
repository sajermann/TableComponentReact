import { Row } from "@tanstack/react-table";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TPerson } from "~/types";
import { filterRangeDate } from "~/utils";
import { useComplex } from "./";

type Any = any;

// Mock dependencies
vi.mock("~/hooks", () => ({
  useColumns: () => ({
    columns: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "country", header: "Country" },
      { accessorKey: "age", header: "Age" },
      { accessorKey: "birthday", header: "Birthday" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "status", header: "Status" },
    ],
  }),
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
}));

vi.mock("~/utils", () => ({
  filterRangeDate: vi.fn(),
}));

vi.mock("../utils", () => ({
  convertComplexFilterToJsonLogic: vi.fn(),
  globalFilterFn: vi.fn(),
}));

// Helper function to create mock row
const createMockRow = <T,>(value: T): Row<TPerson> => {
  return {
    getValue: vi.fn(() => value),
  } as unknown as Row<TPerson>;
};

describe("pages/TraditionalPattern/Filter/components/Complex/hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Column 0 - ID filterFn (numeric comparison)", () => {
    it("should return true when filter is empty", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[0].filterFn! as Any;
      const row = createMockRow(5);

      expect(filterFn(row, "id", ["", ""])).toBe(true);
    });

    it("should filter with 'smaller' operator correctly", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[0].filterFn! as Any;

      const row1 = createMockRow(3);
      const row2 = createMockRow(10);

      expect(filterFn(row1, "id", ["smaller", "5"])).toBe(true);
      expect(filterFn(row2, "id", ["smaller", "5"])).toBe(false);
    });

    it("should filter with 'bigger' operator correctly", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[0].filterFn! as Any;

      const row1 = createMockRow(10);
      const row2 = createMockRow(3);

      expect(filterFn(row1, "id", ["bigger", "5"])).toBe(true);
      expect(filterFn(row2, "id", ["bigger", "5"])).toBe(false);
    });

    it("should filter with 'equals' operator correctly", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[0].filterFn! as Any;

      const row1 = createMockRow(5);
      const row2 = createMockRow(3);

      expect(filterFn(row1, "id", ["equals", "5"])).toBe(true);
      expect(filterFn(row2, "id", ["equals", "5"])).toBe(false);
    });

    it("should return false for unknown operator", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[0].filterFn! as Any;
      const row = createMockRow(5);

      expect(filterFn(row, "id", ["unknown", "5"])).toBe(false);
    });

    it("should handle numeric string conversion", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[0].filterFn! as Any;
      const row = createMockRow("10");

      expect(filterFn(row, "id", ["bigger", "5"])).toBe(true);
      expect(filterFn(row, "id", ["smaller", "5"])).toBe(false);
    });
  });

  describe("Column 2 - Country filterFn (select filter)", () => {
    it("should return true when filter array is empty", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[2].filterFn! as Any;
      const row = createMockRow("Brazil");

      expect(filterFn(row, "country", [])).toBe(true);
    });

    it("should return true when value is included in filter array", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[2].filterFn! as Any;
      const row = createMockRow("Brazil");

      expect(filterFn(row, "country", ["Brazil", "USA", "Canada"])).toBe(true);
    });

    it("should return false when value is not included in filter array", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[2].filterFn! as Any;
      const row = createMockRow("Brazil");

      expect(filterFn(row, "country", ["USA", "Canada"])).toBe(false);
    });

    it("should handle single value in filter array", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[2].filterFn! as Any;
      const row = createMockRow("Brazil");

      expect(filterFn(row, "country", ["Brazil"])).toBe(true);
      expect(filterFn(row, "country", ["USA"])).toBe(false);
    });
  });

  describe("Column 4 - Birthday filterFn (date range)", () => {
    it("should call filterRangeDate with correct parameters", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[4].filterFn! as Any;
      const row = createMockRow("2000-01-01");
      const valueFilter = ["2000-01-01", "2000-12-31"];

      filterFn(row, "birthday", valueFilter);

      expect(filterRangeDate).toHaveBeenCalledWith({
        row,
        columnId: "birthday",
        valueFilter,
      });
    });

    it("should return the result from filterRangeDate", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[4].filterFn! as Any;
      const row = createMockRow("2000-06-15");

      vi.mocked(filterRangeDate).mockReturnValue(true);
      expect(filterFn(row, "birthday", ["2000-01-01", "2000-12-31"])).toBe(
        true
      );

      vi.mocked(filterRangeDate).mockReturnValue(false);
      expect(filterFn(row, "birthday", ["2000-01-01", "2000-12-31"])).toBe(
        false
      );
    });
  });

  describe("Column 5 - Email filterFn (select filter)", () => {
    it("should return true when filter array is empty", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[5].filterFn! as Any;
      const row = createMockRow("user@example.com");

      expect(filterFn(row, "email", [])).toBe(true);
    });

    it("should return true when email is included in filter array", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[5].filterFn! as Any;
      const row = createMockRow("user@example.com");

      expect(
        filterFn(row, "email", ["user@example.com", "admin@example.com"])
      ).toBe(true);
    });

    it("should return false when email is not included in filter array", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[5].filterFn! as Any;
      const row = createMockRow("user@example.com");

      expect(
        filterFn(row, "email", ["admin@example.com", "test@example.com"])
      ).toBe(false);
    });

    it("should handle case-sensitive email comparison", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[5].filterFn! as Any;
      const row = createMockRow("User@Example.com");

      expect(filterFn(row, "email", ["user@example.com"])).toBe(false);
      expect(filterFn(row, "email", ["User@Example.com"])).toBe(true);
    });
  });

  describe("Hook return values", () => {
    it("should return columns array with correct length", () => {
      const { result } = renderHook(() => useComplex());

      expect(result.current.columns).toHaveLength(8);
    });

    it("should return initial globalFilter state", () => {
      const { result } = renderHook(() => useComplex());

      expect(result.current.globalFilter).toEqual({
        input: "",
        custom: [],
      });
    });

    it("should return setGlobalFilter function", () => {
      const { result } = renderHook(() => useComplex());

      expect(typeof result.current.setGlobalFilter).toBe("function");
    });

    it("should return utility functions", () => {
      const { result } = renderHook(() => useComplex());

      expect(typeof result.current.convertComplexFilterToJsonLogic).toBe(
        "function"
      );
      expect(typeof result.current.globalFilterFn).toBe("function");
    });

    it("should have friends column with correct accessor function", () => {
      const { result } = renderHook(() => useComplex());
      const friendsColumn = result.current.columns[7] as Any;

      expect(friendsColumn.accessorKey).toBe("friends");

      const mockPerson = {
        friends: [{ name: "John" }, { name: "Jane" }, { name: "Bob" }],
      } as TPerson;

      const accessorResult = friendsColumn.accessorFn!(mockPerson, 0);
      expect(accessorResult).toBe("John | Jane | Bob");
    });

    it("should have friends column with enableGlobalFilter disabled", () => {
      const { result } = renderHook(() => useComplex());
      const friendsColumn = result.current.columns[7];

      expect(friendsColumn.enableGlobalFilter).toBe(false);
    });
  });

  describe("Edge cases", () => {
    it("should handle undefined filter values in ID column", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[0].filterFn! as Any;
      const row = createMockRow(5);

      expect(filterFn(row, "id", [undefined, undefined])).toBe(false);
    });

    it("should handle null values in select filters", () => {
      const { result } = renderHook(() => useComplex());
      const filterFn = result.current.columns[2].filterFn! as Any;
      const row = createMockRow(null);

      expect(filterFn(row, "country", [null])).toBe(true);
    });

    it("should handle empty friends array", () => {
      const { result } = renderHook(() => useComplex());
      const friendsColumn = result.current.columns[7] as Any;

      const mockPerson = { friends: [] } as Any;
      const accessorResult = friendsColumn.accessorFn!(mockPerson, 0);

      expect(accessorResult).toBe("");
    });
  });
});
