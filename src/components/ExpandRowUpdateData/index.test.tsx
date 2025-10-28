import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Button,
  Checkbox,
  ContainerInput,
  Datepicker,
  Input,
  Label,
} from "~/components";
import type { TPerson } from "~/types";
import { ExpandRowUpdateData } from ".";

// Mock useTranslation hook
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => key, // return key for easier assertions
  }),
}));

vi.mock("../Button");
vi.mocked(Button).mockImplementation((props) => <button {...props} />);

const DEFAULT_PERSON: TPerson = {
  avatar: "",
  birthday: "2000-01-01",
  email: "test@email.com",
  friends: [],
  id: "1",
  isActive: true,
  lastName: "Snow",
  name: "Jon",
  role: "User",
};

describe("components/ExpandRowUpdateData", () => {
  it("should display person data in fields and trigger onSave with updated values on submit", () => {
    const onSave = vi.fn();

    // Render the component with default person data
    const { getByLabelText, getByRole } = render(
      <ExpandRowUpdateData
        onSave={onSave}
        row={{ original: DEFAULT_PERSON } as any}
      />
    );

    // Inputs should be prefilled with the default values
    expect((getByLabelText("NAME") as HTMLInputElement).value).toBe("Jon");
    expect((getByLabelText("LAST_NAME") as HTMLInputElement).value).toBe(
      "Snow"
    );
    expect((getByLabelText("Email") as HTMLInputElement).value).toBe(
      "test@email.com"
    );
    expect((getByLabelText("BIRTHDAY") as HTMLInputElement).value).toBe(
      "2000-01-01"
    );
    // expect((getByLabelText("ACTIVE_USER") as HTMLInputElement).checked).toBe(
    //   true
    // );

    // Update input data
    fireEvent.change(getByLabelText("NAME"), { target: { value: "Robb" } });
    fireEvent.change(getByLabelText("LAST_NAME"), {
      target: { value: "Stark" },
    });

    // Submit the form
    fireEvent.submit(getByRole("button", { name: "SAVE" }));

    // onSave should be called with new data
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        dataToUpdate: expect.objectContaining({
          name: "Robb",
          lastName: "Stark",
          isActive: true,
        }),
        row: expect.anything(),
      })
    );
  });

  it("should call onCancel callback when cancel button is clicked", () => {
    const onCancel = vi.fn();
    const { getByRole } = render(
      <ExpandRowUpdateData
        onCancel={onCancel}
        row={{ original: DEFAULT_PERSON } as any}
      />
    );
    fireEvent.click(getByRole("button", { name: "CANCEL" }));
    expect(onCancel).toHaveBeenCalled();
  });

  it("should use default values if no row is provided", () => {
    const { getByLabelText } = render(<ExpandRowUpdateData />);
    expect((getByLabelText("NAME") as HTMLInputElement).value).toBe("");
    expect((getByLabelText("LAST_NAME") as HTMLInputElement).value).toBe("");
    expect((getByLabelText("Email") as HTMLInputElement).value).toBe("");
    expect((getByLabelText("BIRTHDAY") as HTMLInputElement).value).toBe("");
    // expect((getByLabelText("ACTIVE_USER") as HTMLInputElement).checked).toBe(
    //   true
    // );
  });
});
