import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Backend } from "./";

const mockSetRowCount = vi.fn();
const mockSetPagination = vi.fn();
const mockSetFilterQuery = vi.fn();
let mockBackQuery = "";
let mockShouldThrow = false;

vi.mock("~/utils", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    delay: vi.fn().mockResolvedValue(undefined),
    makeData: {
      ...((actual.makeData as Record<string, unknown>) || {}),
      personWithPagination: () => {
        if (mockShouldThrow) {
          throw new Error("Failed to load");
        }
        return {
          data: [{ id: "1", name: "John Doe", email: "john@example.com" }],
          rowCount: 100,
        };
      },
    },
  };
});

vi.mock("~/hooks", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    useColumns: () => ({
      columns: [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
      ],
    }),
    useTranslation: () => ({
      translate: (key: string) => key,
    }),
  };
});

vi.mock("../../hook", () => ({
  usePagination: () => ({
    rowCount: 50,
    setRowCount: mockSetRowCount,
    pagination: { pageIndex: 0, pageSize: 10 },
    setPagination: mockSetPagination,
    filterQuery: {},
    setFilterQuery: mockSetFilterQuery,
    backQuery: mockBackQuery,
  }),
}));

describe("pages/TraditionalPattern/Pagination/components/Backend", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockBackQuery = "";
    mockShouldThrow = false;
  });

  it("should handle empty backQuery without fetching data", async () => {
    mockBackQuery = "";
    render(<Backend />);

    expect(screen.getByText("PAGINATION_IN_BACKEND")).toBeInTheDocument();
  });

  it("should fetch and load data successfully when backQuery is provided", async () => {
    mockBackQuery = "pageIndex=0&pageSize=10";
    render(<Backend />);

    await waitFor(() => {
      expect(mockSetRowCount).toHaveBeenCalledWith(100);
    });
  });

  it("should handle error gracefully when fetch fails", async () => {
    mockBackQuery = "pageIndex=0&pageSize=10";
    mockShouldThrow = true;
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<Backend />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Error on Backend", expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
