import { tv } from "tailwind-variants";
import { useInput } from "./hooks";
import { TInput, TInputDebounced } from "./types";

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
  isError,
  onBeforeChange,
  className,
  onChange,
  ...rest
}: TInput) {
  const { debounce } = rest as TInputDebounced;
  const { inputPropsInternal } = input({
    color: isError ? "error" : "primary",
  });

  const { onChangeInternal } = useInput({ debounce, onChange, onBeforeChange });

  return (
    <input
      {...rest}
      className={inputPropsInternal({
        class: className,
      })}
      onChange={onChangeInternal}
    />
  );
}
