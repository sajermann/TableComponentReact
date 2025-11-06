import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TConfig } from "../../pages/TraditionalPattern/Selection/types";
import { SelectionConfigSelector } from "./";

// Mock translation hook to return the key as label directly (for simplicity)
vi.mock("~/hooks", () => ({
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
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
      <select
        data-testid={`select-role-${props.value}`}
        {...props}
        onChange={(e) => {
          console.log(`opa`, e.target);
          props.onChange(e);
        }}
      >
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

describe("SelectionConfigSelector", () => {
  let config: TConfig;
  let setConfig: any;
  let setSelectedItems: any;

  beforeEach(() => {
    config = {
      mode: "single",
      componentType: "checkbox",
      disableByIdGreaterThan: 0,
    };
    setConfig = vi.fn();
    setSelectedItems = vi.fn();
  });

  it("should render selection and component type selectors and input", () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <SelectionConfigSelector
        config={config}
        setConfig={setConfig}
        setSelectedItems={setSelectedItems}
      />
    );

    expect(getByLabelText("SELECTION_TYPE")).toBeInTheDocument();
    expect(getByPlaceholderText("Id")).toBeInTheDocument();
  });

  it("changes config mode and componentType when selection type changes", () => {
    const { getByLabelText } = render(
      <SelectionConfigSelector
        config={{ ...config, componentType: "radio" }}
        setConfig={setConfig}
        setSelectedItems={setSelectedItems}
      />
    );

    const select = getByLabelText("SELECTION_TYPE") as HTMLSelectElement;
    // Change selection type to 'multi'
    fireEvent.change(select, { target: { value: "multi" } });

    // Expect mode to be 'multi'
    expect(setConfig).toHaveBeenCalledWith(expect.any(Function));

    // Call the function argument passed to setConfig to test update logic
    const updateFn = setConfig.mock.calls[0][0];
    const updatedConfig = updateFn({
      mode: "single",
      componentType: "radio",
      disableByIdGreaterThan: 0,
    });
    expect(updatedConfig.mode).toBe("multi");
    expect(updatedConfig.componentType).toBe("checkbox"); // should change from radio to checkbox
    expect(setSelectedItems).toHaveBeenCalledWith({});
  });

  it("updates componentType and optionally mode when radio type changes", () => {
    const { getByTestId } = render(
      <SelectionConfigSelector
        config={config}
        setConfig={setConfig}
        setSelectedItems={setSelectedItems}
      />
    );

    // const select = getByLabelText("RADIO_TYPE") as HTMLSelectElement;
    const select = getByTestId("select-role-checkbox");
    // Change componentType to 'radio'
    fireEvent.change(select, { target: { value: "radio" } });

    expect(setConfig).toHaveBeenCalledWith(expect.any(Function));
    const updateFn = setConfig.mock.calls[0][0];
    const updatedConfig = updateFn(config);
    expect(updatedConfig.componentType).toBe("radio");
    expect(updatedConfig.mode).toBe("single"); // mode forced to single when radio
  });

  it("updates disableByIdGreaterThan config and resets selectedItems when input changes", () => {
    const { getByPlaceholderText } = render(
      <SelectionConfigSelector
        config={config}
        setConfig={setConfig}
        setSelectedItems={setSelectedItems}
      />
    );

    const input = getByPlaceholderText("Id");
    fireEvent.change(input, { target: { value: "50a3" } });

    // The regex should filter out non-numeric chars before onChange
    expect(setConfig).toHaveBeenCalledWith(expect.any(Function));
    expect(setSelectedItems).toHaveBeenCalledWith({});

    const updateFn = setConfig.mock.calls[0][0];
    const updatedConfig = updateFn(config);
    expect(updatedConfig.disableByIdGreaterThan).toBe(503); // '50a3' filtered to '503'
  });
});
