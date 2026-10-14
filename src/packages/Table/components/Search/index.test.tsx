import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Search } from "./";

describe("packages/Table/components/Search", () => {
  it("should return null when show is falsy", () => {
    const { container } = render(
      <Search show={false} value="" onChange={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render input when show is true and handle typing", () => {
    const onChange = vi.fn();
    render(
      <Search show={true} value="query" onChange={onChange} />
    );

    const input = screen.getByRole("searchbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("query");

    fireEvent.change(input, { target: { value: "new query" } });
    expect(onChange).toHaveBeenCalled();
  });
});
