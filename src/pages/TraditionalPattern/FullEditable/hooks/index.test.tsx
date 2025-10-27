import { act, render, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Select from "~/components/Select";
import { useFullEditable } from ".";

type Any = any;

// Mocks como no seu exemplo
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
}));
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
}));

// Mocks dos componentes
vi.mock("~/components", () => ({
  Input: (props: Any) => (
    <input {...props} data-testid={`input-${props.id}-${props.value}`} />
  ),
  Datepicker: (props: Any) => (
    <input type="date" {...props} data-testid={`datepicker-${props.value}`} />
  ),
  Checkbox: (props: Any) => (
    <input
      type="checkbox"
      {...props}
      data-testid={`checkbox-${props.id}-${props.checked}`}
    />
  ),
  ContainerInput: (props: Any) => (
    <div data-testid="container-input-test" {...props} />
  ),
}));

vi.mock("~/components/Select", () => ({
  __esModule: true,
  default: {
    Container: ({ children, ...props }: any) => (
      <div data-testid="select-container" {...props}>
        {children}
      </div>
    ),
    Select: ({ children, ...props }: any) => (
      <select data-testid="select-role" {...props}>
        {children}
      </select>
    ),
    Option: ({ children, ...props }: any) => (
      <option data-testid={`select-option-${props.value}`} {...props}>
        {children}
      </option>
    ),
    Arrow: (props: any) => <span data-testid="select-arrow" {...props} />,
  },
}));

describe("pages/TableMega/FullEditable/hooks", () => {
  it("initializes columns/data and covers cells", () => {
    const { result } = renderHook(() => useFullEditable());
    const columns = result.current.columns as Any;
    const row0 = { index: 0, original: result.current.data[0] };

    // avatar cell
    const avatarCol = columns.find((c: Any) => c.accessorKey === "avatar");
    const avatarCell = avatarCol.cell({
      getValue: () => row0.original.avatar,
      row: row0,
    });
    expect(avatarCell.props.className).toContain("w-14");

    // name cell
    const nameCol = columns.find((c: Any) => c.accessorKey === "name");
    const nameCell = nameCol.cell({
      getValue: () => row0.original.name,
      row: row0,
    });
    expect(nameCell.props["id"]).toBe("name");

    // lastName cell
    const lastNameCol = columns.find((c: Any) => c.accessorKey === "lastName");
    const lastNameCell = lastNameCol.cell({
      getValue: () => row0.original.lastName,
      row: row0,
    });
    expect(lastNameCell.props["id"]).toBe("lastName");

    // birthday cell
    const birthdayCol = columns.find((c: Any) => c.accessorKey === "birthday");
    const birthdayCell = birthdayCol.cell({
      getValue: () => row0.original.birthday,
      row: row0,
    });
    expect(birthdayCell.props["value"]).toBe("1990-01-01");

    // // role cell
    const roleCol = columns.find((c: Any) => c.accessorKey === "role");
    const roleCell = roleCol.cell({
      getValue: () => row0.original.role,
      row: row0,
    });

    const { container } = render(roleCell);
    // expect(container).toMatchSnapshot();
    expect(container.querySelector('[data-testid="select-role"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="select-role"]')).toBeTruthy();
    expect(
      container.querySelector('[data-testid="select-option-Admin"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="select-arrow"]')
    ).toBeTruthy();

    // isActive cell
    const isActiveCol = columns.find((c: Any) => c.accessorKey === "isActive");
    const isActiveCell = isActiveCol.cell({
      getValue: () => row0.original.isActive,
      row: row0,
    });
    const { container: containerIsActive } = render(isActiveCell);
    expect(
      containerIsActive.querySelector('[data-testid="container-input-test"]')
    ).toBeTruthy();
  });

  it("updates value via handleInput", () => {
    const { result } = renderHook(() => useFullEditable()) as Any;

    act(() => {
      result.current.columns[2]
        ?.cell?.({
          getValue: () => result.current.data[0].name,
          row: { index: 0, original: result.current.data[0] },
        })
        .props.onChange({ target: { id: "name", value: "AliceUpdated" } });
    });

    expect(result.current.data[0].name).toBe("AliceUpdated");
  });
});
