import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tr } from "./";

describe("packages/TableMega/components/Tr", () => {
  it("should render tr and trigger onClickRow when clicked", () => {
    const mockRow = { id: "row-1" } as any;
    const onClickRow = vi.fn();

    render(
      <table>
        <tbody>
          <Tr
            row={mockRow}
            onClickRow={onClickRow}
            className="custom-tr"
            data-testid="test-tr"
          >
            <td>Cell</td>
          </Tr>
        </tbody>
      </table>
    );

    const tr = screen.getByTestId("test-tr");
    expect(tr).toHaveClass("custom-tr");

    fireEvent.click(tr);
    expect(onClickRow).toHaveBeenCalledTimes(1);
    expect(onClickRow).toHaveBeenCalledWith({ row: mockRow });
  });

  it("should render tr without throwing when onClickRow is undefined", () => {
    const mockRow = { id: "row-2" } as any;

    render(
      <table>
        <tbody>
          <Tr row={mockRow} data-testid="test-tr-no-handler">
            <td>Cell</td>
          </Tr>
        </tbody>
      </table>
    );

    const tr = screen.getByTestId("test-tr-no-handler");
    fireEvent.click(tr);
    expect(tr).toBeInTheDocument();
  });
});
