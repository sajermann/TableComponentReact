import { render, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TPerson } from "~/types";
import { useColumns } from "./";

type Any = any;

describe("hooks/useColumns", () => {
  it("should return columns with default sizes and correct accessors/cells", () => {
    const { result } = renderHook(() => useColumns());
    const columns = result.current.columns as Any[];

    expect(columns.length).toBeGreaterThan(0);

    // Test id accessorFn
    const idCol = columns.find((c) => c.accessorKey === "id");
    expect(idCol.accessorFn({ id: "42" })).toBe(42);

    // Test avatar cell
    const avatarCol = columns.find((c) => c.accessorKey === "avatar");
    const { container: avatarContainer } = render(
      avatarCol.cell({ getValue: () => "https://example.com/avatar.png" })
    );
    expect(avatarContainer.querySelector("img")).toHaveAttribute(
      "src",
      "https://example.com/avatar.png"
    );

    // Test birthday accessorFn and sortingFn
    const birthdayCol = columns.find((c) => c.accessorKey === "birthday");
    expect(
      birthdayCol.accessorFn({ birthday: "2020-01-01T00:00:00.000Z" })
    ).toBeDefined();

    const rowA = {
      getValue: () => "01/01/2020",
    } as any;
    const rowB = {
      getValue: () => "01/01/2021",
    } as any;
    // dateB > dateA
    expect(birthdayCol.sortingFn(rowA, rowB, "birthday")).toBe(-1);
    // dateB < dateA
    expect(birthdayCol.sortingFn(rowB, rowA, "birthday")).toBe(1);

    // Test isActive cell
    const isActiveCol = columns.find((c) => c.accessorKey === "isActive");
    const { container: activeContainer } = render(
      isActiveCol.cell({
        row: { original: { isActive: true } as TPerson },
      })
    );
    expect(activeContainer.querySelector(".text-green-500")).toBeInTheDocument();

    const { container: inactiveContainer } = render(
      isActiveCol.cell({
        row: { original: { isActive: false } as TPerson },
      })
    );
    expect(inactiveContainer.querySelector(".text-red-500")).toBeInTheDocument();
  });

  it("should respect columnSizeDefault when provided", () => {
    const customSizes = {
      name: 180,
      lastName: 190,
      birthday: 200,
      email: 210,
      role: 220,
    };
    const { result } = renderHook(() => useColumns(customSizes));
    const columns = result.current.columns as Any[];

    const nameCol = columns.find((c) => c.accessorKey === "name");
    const lastNameCol = columns.find((c) => c.accessorKey === "lastName");
    const birthdayCol = columns.find((c) => c.accessorKey === "birthday");
    const emailCol = columns.find((c) => c.accessorKey === "email");
    const roleCol = columns.find((c) => c.accessorKey === "role");

    expect(nameCol.size).toBe(180);
    expect(lastNameCol.size).toBe(190);
    expect(birthdayCol.size).toBe(200);
    expect(emailCol.size).toBe(210);
    expect(roleCol.size).toBe(220);
  });
});
