import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Table } from ".";

describe("packages/Table/components", () => {
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      footer: () => "Name Footer",
    },
    {
      accessorKey: "age",
      header: "Age",
      footer: () => "Age Footer",
    },
  ];

  const data = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
  ];

  it("should render table with data, header, and footer", () => {
    render(
      <Table
        columns={columns}
        data={data}
        showFooter
        height="500px"
        minHeight="300px"
        maxHeight="600px"
      />
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Name Footer")).toBeInTheDocument();
  });

  it("should support uncontrolled and controlled global filter and sorting", () => {
    const setFilter = vi.fn();
    const manualSortFn = vi.fn();

    const { rerender } = render(
      <Table
        columns={columns}
        data={data}
        globalFilter={{
          showInput: true,
        }}
        sorting={{
          manualSorting: {
            fn: manualSortFn,
          },
        }}
      />
    );

    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, { target: { value: "John" } });

    // Click sort header
    const nameHeader = screen.getByRole("button", { name: /name/i });
    fireEvent.click(nameHeader);
    expect(manualSortFn).toHaveBeenCalled();

    // Rerender with controlled filter
    rerender(
      <Table
        columns={columns}
        data={data}
        globalFilter={{
          showInput: true,
          controlled: {
            filter: "Jane",
            setFilter,
          },
        }}
      />
    );

    fireEvent.change(searchInput, { target: { value: "New Search" } });
    expect(setFilter).toHaveBeenCalledWith("New Search");
  });

  it("should support pagination (automatic controlled and manual)", () => {
    const onPaginationChange = vi.fn();

    // Automatic controlled
    const { rerender } = render(
      <Table
        columns={columns}
        data={data}
        pagination={{
          automatic: {
            controlled: {
              pageIndex: 0,
              pageSize: 10,
              onChange: onPaginationChange,
            },
          },
        }}
      />
    );

    expect(screen.getByText("John")).toBeInTheDocument();

    // Manual pagination
    rerender(
      <Table
        columns={columns}
        data={data}
        pagination={{
          manual: {
            pageIndex: 1,
            pageSize: 10,
            rowCount: 20,
            onChange: onPaginationChange,
          },
        }}
      />
    );

    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it("should support selection and onResizing callback", () => {
    vi.useFakeTimers();
    const setRowSelection = vi.fn();
    const onResizing = vi.fn();

    render(
      <Table
        columns={columns}
        data={data}
        selection={{
          type: "multi",
          rowSelection: { 0: true },
          setRowSelection,
        }}
        onResizing={onResizing}
      />
    );

    vi.advanceTimersByTime(1100);
    expect(onResizing).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
