import { ForwardedRef, useEffect, useState } from "react";
import ReactSelect, { GroupBase, Props } from "react-select";

import { useDarkMode } from "~/hooks/useDarkMode";
import { useTranslation } from "~/hooks/useTranslation";
import { format } from "./utils";

type TProps = {
  async?: {
    callback: (newValue: string) => void;
    debounce: number;
    minLength?: number;
  };
  iserror?: boolean;
  id?: string;
  innerRef?: ForwardedRef<HTMLSelectElement>;
};

export function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group> & TProps) {
  const { async, iserror, id, innerRef, ...rest } = props;
  const [inputValue, setInputValue] = useState("");
  const { translate } = useTranslation();
  const { darkMode } = useDarkMode();

  function preInputChange(e: string) {
    if (async?.minLength && async?.minLength > e.length) {
      return;
    }
    setInputValue(e);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (async) {
        async.callback(inputValue);
      }
    }, async?.debounce);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <ReactSelect
      {...rest}
      ref={innerRef as any}
      inputId={id}
      onInputChange={preInputChange}
      loadingMessage={() => translate("LOADING...")}
      noOptionsMessage={() => translate("NO_DATA")}
      styles={{
        control: (baseStyles: object, state: { isFocused: boolean }) => ({
          ...baseStyles,
          boxShadow: format.stylesControl({
            isFocused: state.isFocused,
            iserror,
          }),
          background: "transparent",
          minHeight: "2.75rem",
          maxHeight: "max-content",
        }),
        placeholder: (baseStyles: object) => ({
          ...baseStyles,
          color: "rgb(159, 166, 178)",
        }),
        menu: (baseStyles: object) => ({
          ...baseStyles,
          width: "100%",
          background: "transparent",
          border: ".0625rem solid white",
          backdropFilter: "blur(0.75rem)",
        }),
        option: (
          baseStyles: object,
          state: { isSelected: boolean; isFocused: boolean }
        ) => ({
          ...baseStyles,
          color: state.isSelected || state.isFocused ? "#fff" : "#6C757D",
          width: "100%",
          background: state.isFocused ? "rgba(59, 130, 246, 0.6)" : "",
          "&:hover": {
            background: "rgba(59, 130, 246, 0.7)",
            color: "white",
          },
        }),
        singleValue: (baseStyles: object) => ({
          ...baseStyles,
          width: "100%",
          color: darkMode ? "white" : "black",
        }),
        input: (baseStyles: object) => ({
          ...baseStyles,
          color: darkMode ? "white" : "black",
        }),
      }}
      classNames={{
        control: (state: { isFocused: boolean }) =>
          format.classNamesControl({ isFocused: state.isFocused, iserror }),
        multiValue: () =>
          "!bg-transparent border rounded backdrop-blur-md h-7 flex items-center",
        multiValueLabel: () => "text-black dark:text-white",
        multiValueRemove: () =>
          "h-full hover:!bg-transparent hover:!text-blue-500",
      }}
    />
  );
}
