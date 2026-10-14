import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LoadingSelector } from ".";

vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
}));

describe("components/LoadingSelector", () => {
  it("should render and trigger onChange when select changes", () => {
    const onChange = vi.fn();
    render(
      <LoadingSelector
        withData={true}
        isLoading={false}
        onChange={onChange}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "WITHOUT_DATA" } });
    expect(onChange).toHaveBeenCalledWith({
      isLoading: false,
      withData: false,
    });

    fireEvent.change(select, { target: { value: "WITH_DATA" } });
    expect(onChange).toHaveBeenCalledWith({
      isLoading: false,
      withData: true,
    });
  });

  it("should trigger onChange when checkbox changes", () => {
    const onChange = vi.fn();
    render(
      <LoadingSelector
        withData={true}
        isLoading={false}
        onChange={onChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith({
      withData: true,
      isLoading: true,
    });
  });
});
