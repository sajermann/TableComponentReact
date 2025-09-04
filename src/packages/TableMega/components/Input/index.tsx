import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { TInput } from "./types";
import { onChangeCustom, preOnChange } from "./utils";

const input = tv({
  slots: {
    inputPropsInternal: [
      "group outline-none focus:ring-1 border h-11 py-1 px-2 rounded w-full bg-transparent",
      "transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50",
    ],
  },
  variants: {
    color: {
      primary: {
        inputPropsInternal:
          "focus:ring-blue-500 group-hover:border-blue-500 focus:border-blue-500",
      },
      error: {
        inputPropsInternal:
          "focus:ring-red-500 group-hover:border-red-500 focus:border-red-500",
      },

      normal: {
        inputPropsInternal: "",
      },
    },
  },

  defaultVariants: {
    color: "normal",
  },
});

export function Input({
  iserror,
  onBeforeChange,
  onChange,
  debounce,
  className,
  ...rest
}: TInput) {
  const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();
  const { inputPropsInternal } = input({
    color: iserror ? "error" : "primary",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debounce && event) {
        onChangeCustom({
          e: event,
          onBeforeChange,
          onChange,
        });
      }
    }, debounce);

    return () => clearTimeout(timer);
  }, [event]);

  return (
    <input
      {...rest}
      className={inputPropsInternal({
        class: className,
      })}
      onChange={(e) =>
        preOnChange({
          e,
          setEvent,
          debounce,
          onBeforeChange,
          onChange,
        })
      }
    />
  );
}
