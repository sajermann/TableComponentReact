import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useFullEditable } from ".";
import { handleFormSubmit } from "../utils";

type Any = any;

// MOCKS
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
  showInDevelopment: (props: object) => props,
}));
vi.mock("~/components", () => ({
  Input: (props: Any) => <input {...props} />,
  Datepicker: (props: Any) => <input type="date" {...props} />,
  Checkbox: (props: Any) => <input type="checkbox" {...props} />,
  ContainerInput: (props: Any) => <div {...props} />,
}));
vi.mock("~/components/Select", () => {
  const Option = (props: Any) => <option {...props}>{props.children}</option>;
  return {
    __esModule: true,
    default: {},
    Container: (props: Any) => <div {...props} />,
    Select: (props: Any) => <select {...props}>{props.children}</select>,
    Option,
    Arrow: () => <span data-testid="select-arrow" />,
  };
});
const handleFormSubmitMock = vi.fn();
vi.mock("../utils");

// TESTES
describe("pages/TableMega/FullEditable/hooks", () => {
  it("abrange todos os cells customizados", () => {
    const { result } = renderHook(() => useFullEditable());
    const columns = result.current.columns as Any;
    const row0 = { index: 0, original: result.current.data[0] };
    const getValue = (key: string) => result.current.data[0][key];

    // Coluna avatar
    const avatarCol = columns.find((c: Any) => c.accessorKey === "avatar");
    const avatarCell = avatarCol.cell({
      row: row0,
      getValue: () => getValue("avatar"),
    });
    expect(avatarCell.props.className).toContain("w-14");

    // Coluna name
    const nameCol = columns.find((c: Any) => c.accessorKey === "name");
    const nameCell = nameCol.cell({
      row: row0,
      getValue: () => getValue("name"),
    });
    expect(nameCell.props["data-testid"]).toBe("input-name-0");
    expect(nameCell.props.id).toBe("name-0");
    expect(nameCell.props.defaultValue).toBe("Alice");

    // Coluna lastName
    const lastNameCol = columns.find((c: Any) => c.accessorKey === "lastName");
    const lastNameCell = lastNameCol.cell({
      row: row0,
      getValue: () => getValue("lastName"),
    });
    expect(lastNameCell.props["data-testid"]).toBe("input-lastName-0");
    expect(lastNameCell.props.defaultValue).toBe("Smith");

    // Coluna birthday
    const birthdayCol = columns.find((c: Any) => c.accessorKey === "birthday");
    const birthdayCell = birthdayCol.cell({
      row: row0,
      getValue: () => getValue("birthday"),
    });
    expect(birthdayCell.props.defaultValue).toBe("1990-01-01");
    expect(birthdayCell.props.id).toBe("birthday-0");

    // Coluna role
    const roleCol = columns.find((c: Any) => c.accessorKey === "role");
    const roleCell = roleCol.cell({ row: row0 });
    // Container e Arrow
    // expect(roleCell.type).toBeDefined();
    // expect(roleCell.props.children[1].props["data-testid"]).toBe(
    //   "select-arrow"
    // );

    // Coluna isActive
    const isActiveCol = columns.find((c: Any) => c.accessorKey === "isActive");
    const isActiveCell = isActiveCol.cell({
      row: row0,
      getValue: () => getValue("isActive"),
    });
    // ContainerInput + Checkbox
    expect(isActiveCell.props.children.props["data-testid"]).toBe(
      "checkbox-isActive-0"
    );
    expect(isActiveCell.props.children.props.defaultChecked).toBe(true);
  });

  // it("executa handleFormSubmit", () => {
  //   vi.mocked(handleFormSubmit).mockImplementation(() => ({
  //     handleFormSubmit: handleFormSubmitMock,
  //   }));
  //   const { result } = renderHook(() => useFullEditable());
  //   // Garante que handleFormSubmit chama função utilitária com setData
  //   act(() => {
  //     result.current.handleFormSubmit();
  //   });
  //   expect(handleFormSubmitMock).toHaveBeenCalled();
  // });
});
