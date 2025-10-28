import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useSelection } from ".";
import { TConfig } from "../types";

// Mock the dependencies
vi.mock("../types", () => ({
  TConfig: {},
  TSelectionRow: {},
}));

vi.mock("~/types", () => ({
  TPerson: {},
}));

vi.mock("~/hooks", () => ({
  useColumns: () => ({
    columns: [
      {
        id: "name",
        header: "Name",
        cell: ({ row }: any) => row.name,
      },
    ],
  }),
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
}));

vi.mock("~/components/SelectionType", () => ({
  SelectionType: (props: any) => (
    <div data-testid="selection-type" {...props} />
  ),
}));

describe("pages/TraditionalPattern/Selection/hooks", () => {
  it("should initialize with default config and selected items", () => {
    const { result } = renderHook(() => useSelection());
    expect(result.current.config.mode).toBe("single"); // Checks initial selection mode
    expect(result.current.config.componentType).toBe("checkbox"); // Checks component type
    expect(result.current.config.disableByIdGreaterThan).toBeNull(); // Checks default disabling condition
    expect(result.current.selectedItems).toEqual({}); // Should be empty map/object
  });

  it("should allow updating config", () => {
    const { result } = renderHook(() => useSelection());
    act(() => {
      result.current.setConfig((prevConfig: TConfig) => ({
        ...prevConfig,
        mode: "multi",
      }));
    });
    expect(result.current.config.mode).toBe("multi"); // Verify config change
  });

  it("should allow updating selectedItems", () => {
    const { result } = renderHook(() => useSelection());
    act(() => {
      result.current.setSelectedItems({ 1: true });
    });
    expect(result.current.selectedItems).toEqual({ 1: true }); // Verify selection
  });

  it("should merge columns correctly", () => {
    const { result } = renderHook(() => useSelection());
    expect(Array.isArray(result.current.columns)).toBe(true); // Returns columns array
    expect(result.current.columns.some((col) => col.id === "selection")).toBe(
      true
    ); // Contains internal selection column
    expect(result.current.columns.some((col) => col.id === "name")).toBe(true); // Contains external mocked column
  });
});
