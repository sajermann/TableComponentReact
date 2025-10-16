import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Chip } from ".";
import { chipUtils } from "./utils";

vi.spyOn(chipUtils, "change").mockImplementation(
  ({ event, setValueEditing }) => {
    setValueEditing(event.target.value);
  }
);

vi.spyOn(chipUtils, "keyDownInput").mockImplementation(() => {});
vi.spyOn(chipUtils, "save").mockImplementation(() => {});

describe("components/Chip", () => {
  it("renders in no-updating mode with correct value", () => {
    render(<Chip value="test" />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  // it("calls onRemove when close action button clicked", () => {
  //   const onRemove = vi.fn();
  //   render(<Chip value="remove-test" onRemove={onRemove} />);
  //   const closeButton = screen.getByRole("button", { name: /close/i });
  //   closeButton && fireEvent.click(closeButton);
  //   expect(onRemove).toHaveBeenCalledWith("remove-test");
  // });

  it("enters updating mode when no-updating container clicked and onChange provided", () => {
    const onChange = vi.fn();
    render(<Chip value="editable" onChange={onChange} />);
    const noUpdatingContainer = screen.getByText("editable").parentElement!;
    fireEvent.click(noUpdatingContainer);
    expect(screen.getByDisplayValue("editable")).toBeInTheDocument(); // UpdatingInput with valueEditing
  });

  it("updates the input display value on input change", () => {
    const onChange = vi.fn();
    render(<Chip value="value1" onChange={onChange} />);
    fireEvent.click(screen.getByText("value1").parentElement!); // enter updating
    const input = screen.getByDisplayValue("value1");
    fireEvent.change(input, { target: { value: "value2" } });
    expect(input).toHaveValue("value2");
  });

  it("invokes chipUtils.keyDownInput on keyDown event", () => {
    const onChange = vi.fn();
    render(<Chip value="keyTest" onChange={onChange} />);
    fireEvent.click(screen.getByText("keyTest").parentElement!);
    const input = screen.getByDisplayValue("keyTest");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(chipUtils.keyDownInput).toHaveBeenCalled();
  });

  it("invokes chipUtils.save on input blur", () => {
    const onChange = vi.fn();
    render(<Chip value="blurTest" onChange={onChange} />);
    fireEvent.click(screen.getByText("blurTest").parentElement!);
    const input = screen.getByDisplayValue("blurTest");
    fireEvent.blur(input);
    expect(chipUtils.save).toHaveBeenCalled();
  });

  // it("renders ActionButton with correct icon and show conditions updating", () => {
  //   const onRemove = vi.fn();
  //   render(<Chip value="actionTest" onRemove={onRemove} onChange={() => {}} />);
  //   fireEvent.click(screen.getByText("actionTest").parentElement!);
  //   expect(
  //     screen.getByRole("button", { name: /checked/i })
  //   ).toBeInTheDocument();
  // });

  // it("renders ActionButton with close icon and show conditions no updating", () => {
  //   const onRemove = vi.fn();
  //   render(<Chip value="actionTest" onRemove={onRemove} />);
  //   expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  // });

  it("does not enter updating mode if onChange is not provided", () => {
    render(<Chip value="noEdit" />);
    fireEvent.click(screen.getByText("noEdit").parentElement!);
    expect(screen.queryByDisplayValue("noEdit")).toBeNull();
  });
});
