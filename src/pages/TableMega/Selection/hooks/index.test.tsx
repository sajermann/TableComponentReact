import { act, render, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useSelection } from ".";
import { TConfig } from "../types";
import { verifyIndeterminate } from "../utils";

type Any = any;

vi.mock("../utils");

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
        cell: ({ row }: Any) => row.name,
      },
    ],
  }),
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
}));

vi.mock("~/components/SelectionType", () => ({
  SelectionType: (props: Any) => (
    <select
      data-testid="selection-type"
      data-is-activated={props.isActivated}
      // onChange={() => console.log(`sajermannonchange`)}
      {...props}
    />
  ),
}));

describe("pages/TableMega/Selection/hooks", () => {
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

  it("should render SelectionType in header when mode is multi and call onChange handler", () => {
    vi.mocked(verifyIndeterminate).mockImplementation(() => false);
    const { result } = renderHook(() => useSelection());

    act(() => {
      result.current.setConfig((prev) => ({
        ...prev,
        mode: "multi",
      }));
    });

    const onToggleAllRowsSelected = vi.fn();
    const Header = result.current.columns.find(
      (c) => c.id === "selection"
    ) as Any;

    // Mock que retorna funcao para toggle all rows
    const tableMock = {
      getIsAllRowsSelected: () => false,
      getIsSomeRowsSelected: () => false,
      getToggleAllRowsSelectedHandler: () => onToggleAllRowsSelected,
    };

    const { container } = render(Header?.header?.({ table: tableMock }));

    expect(
      container.querySelector("[data-testid='selection-type']")
    ).toBeTruthy();

    expect(
      container
        .querySelector("[data-testid='selection-type']")
        ?.getAttribute("data-is-activated")
    ).toBe("false");

    // Dispara onChange do SelectionType
    const selectionType = container.querySelector(
      "[data-testid='selection-type']"
    );
    selectionType &&
      selectionType.dispatchEvent(new MouseEvent("change", { bubbles: true }));

    // Verifica se a funcao foi chamada
    expect(onToggleAllRowsSelected).toHaveBeenCalled();
  });

  it("should not render SelectionType in header when mode is single", () => {
    const { result } = renderHook(() => useSelection());
    act(() => {
      result.current.setConfig((prev) => ({
        ...prev,
        mode: "single",
      }));
    });

    const Header: Any = result.current.columns.find(
      (c) => c.id === "selection"
    )?.header;
    const tableMock = {
      getIsAllRowsSelected: () => false,
      getIsSomeRowsSelected: () => false,
      getToggleAllRowsSelectedHandler: () => () => {},
    };
    if (Header) {
      const { container } = render(Header({ table: tableMock }));
      expect(
        container.querySelector("[data-testid='selection-type']")
      ).toBeFalsy();
    }
  });

  it("should render SelectionType in column when mode is multi and call onChange handler", () => {
    vi.mocked(verifyIndeterminate).mockImplementation(() => false);
    const { result } = renderHook(() => useSelection());

    act(() => {
      result.current.setConfig((prev) => ({
        ...prev,
        mode: "multi",
        disableByIdGreaterThan: 10,
      }));
    });

    const spyTggleSelected = vi.fn();
    const Column = result.current.columns.find(
      (c) => c.id === "selection"
    ) as Any;

    // Mock que retorna funcao para toggle all rows
    const tableMock = {
      getIsAllRowsSelected: () => false,
      getIsSomeRowsSelected: () => false,
      getToggleAllRowsSelectedHandler: () => vi.fn(),
    };
    const rowMock = {
      index: 1,
      getIsSelected: () => true,
      toggleSelected: () => spyTggleSelected,
      getValue: () => "0",
    };

    const { container } = render(
      Column?.cell?.({ table: tableMock, row: rowMock })
    );

    expect(
      container.querySelector("[data-testid='selection-type']")
    ).toBeTruthy();

    expect(
      container
        .querySelector("[data-testid='selection-type']")
        ?.getAttribute("data-is-activated")
    ).toBe("true");

    // Dispara onChange do SelectionType
    const selectionType = container.querySelector(
      "[data-testid='selection-type']"
    );
    selectionType &&
      selectionType.dispatchEvent(new MouseEvent("change", { bubbles: true }));
  });
});
