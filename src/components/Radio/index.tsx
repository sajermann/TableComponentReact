import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { ReactNode } from "react";
import { tv } from "tailwind-variants";

const radioVariants = tv({
  slots: {
    radioItemPropsInternal: [
      "group outline-none focus:ring-1 border",
      "transition-all duration-500",
      "hover:cursor-pointer bg-transparent w-11 h-11",
      "rounded-full focus:shadow-[0_0_0_2px]",
      "outline-none cursor-default",
      "disabled:!cursor-not-allowed disabled:!opacity-50",
    ],
    radioIndicatorPropsInternal: [
      "flex items-center justify-center w-full h-full",
      "transition-all duration-500",
      "after:w-6 after:h-6 after:rounded-full",
    ],
  },
  variants: {
    color: {
      primary: {
        radioItemPropsInternal:
          "focus:ring-blue-500 focus:shadow-blue-500 group-hover:border-blue-500 focus:border-blue-500",
        radioIndicatorPropsInternal: "after:bg-blue-500",
      },
      error: {
        radioItemPropsInternal:
          "focus:ring-red-500 focus:shadow-red-500 group-hover:border-red-500 focus:border-red-500",
        radioIndicatorPropsInternal: "after:bg-red-500",
      },

      white: {
        radioItemPropsInternal:
          "focus:ring-white focus:shadow-white group-hover:border-white focus:border-white",
        radioIndicatorPropsInternal: "after:bg-white",
      },

      black: {
        radioItemPropsInternal:
          "focus:ring-black focus:shadow-black group-hover:border-black focus:border-black",
        radioIndicatorPropsInternal: "after:bg-black",
      },

      normal: {
        radioItemPropsInternal: "",
      },
    },
  },

  defaultVariants: {
    color: "normal",
  },
});

type TRadioGroupProps = {
  onValueChange?: (data: string) => void;
  children: ReactNode;
  className?: string;
  defaultValue?: string;
  value?: string | null;
};
export function RadioGroup({
  children,
  onValueChange,
  className,
  defaultValue,
  value,
}: TRadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      onValueChange={onValueChange}
      className={className}
      defaultValue={defaultValue}
      value={value as string | undefined}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
}

type TRadioItemProps = {
  colorStyle?: "primary" | "white" | "black";
  id?: string;
  value: string;
  itemProps?: {
    className?: string;
  };
  indicatorProps?: {
    className?: string;
  };
  disabled?: boolean;
  iserror?: boolean;
};

export function RadioItem({
  id,
  value,
  itemProps,
  indicatorProps,
  disabled,
  iserror,
  colorStyle = "primary",
}: TRadioItemProps) {
  const { radioItemPropsInternal, radioIndicatorPropsInternal } = radioVariants(
    {
      color: iserror ? "error" : colorStyle,
    }
  );
  return (
    <RadioGroupPrimitive.Item
      id={id}
      value={value}
      className={radioItemPropsInternal({
        class: itemProps?.className,
      })}
      disabled={disabled}
    >
      <RadioGroupPrimitive.Indicator
        className={radioIndicatorPropsInternal({
          class: indicatorProps?.className,
        })}
      />
    </RadioGroupPrimitive.Item>
  );
}
