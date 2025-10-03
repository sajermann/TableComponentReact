import { act, renderHook } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { useFullEditable } from ".";
import { handleFormSubmit } from "../utils";

// Mock translation hook
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
}));

// Mock data and utilities
vi.mock("~/utils", () => ({
  makeData: {
    person: () => [
      {
        id: "1",
        avatar: "avatar1.png",
        name: "Alice",
        lastName: "Smith",
        birthday: "1990-01-01",
        email: "alice@example.com",
        role: "Admin",
        isActive: true,
      },
      {
        id: "2",
        avatar: "avatar2.png",
        name: "Bob",
        lastName: "Jones",
        birthday: "1985-02-02",
        email: "bob@example.com",
        role: "User",
        isActive: false,
      },
    ],
  },
  showInDevelopment: (props: object) => props,
  handleFormSubmit: vi.fn(),
}));

describe("pages/TableMega/FullEditable/hooks", () => {
  it("initializes with expected columns and data", () => {
    const { result } = renderHook(() => useFullEditable());

    expect(result.current.columns).toHaveLength(8);
    expect(result.current.data).toHaveLength(2);
  });

  it("renders Input component cell with expected test id", () => {
    const { result } = renderHook(() => useFullEditable());
    const columns = result.current.columns as any;

    const nameColumn = columns.find((c: any) => c.accessorKey === "name");
    expect(nameColumn).toBeDefined();

    const mockRow = { index: 0, original: result.current.data[0] };
    const mockGetValue = () => result.current.data[0].name;

    const cellElement = nameColumn?.cell!({
      row: mockRow,
      getValue: mockGetValue,
    });
    expect(cellElement.props["data-testid"]).toBe("input-name-0");
  });
});
