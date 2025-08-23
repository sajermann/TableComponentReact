import * as CheckboxRadix from "@radix-ui/react-checkbox";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useState,
} from "react";
import { tv } from "tailwind-variants";

import { CheckedState } from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { Icons } from "../Icons";

interface TCheckboxProps
  extends Omit<
    React.ForwardRefExoticComponent<
      CheckboxRadix.CheckboxProps & React.RefAttributes<HTMLButtonElement>
    >,
    "checked" | "defaultChecked" | "$$typeof" | "onClick" | "id"
  > {
  disabled?: boolean;
  checkedIcon?: ReactNode;
  indeterminateIcon?: ReactNode;
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onClick?: (e?: MouseEvent<HTMLButtonElement, Event>) => void;
  id?: string;
  onCheckedChange?: (data: {
    target: { value: CheckedState; id: string | undefined };
  }) => void;
  className?: string;
  iserror?: boolean;
}

const checkboxVariants = tv({
  slots: {
    checkboxPropsInternal: [
      "group outline-none focus:ring-1 border rounded h-11 w-11 bg-transparent",
      "transition-all duration-500",
      "disabled:cursor-not-allowed disabled:!opacity-50 focus:ring-1",
    ],
  },
  variants: {
    color: {
      primary: {
        checkboxPropsInternal:
          'focus:ring-blue-500 group-hover:border-blue-500 focus:border-blue-500 data-[state="checked"]:border-blue-500 data-[state="indeterminate"]:border-blue-500',
      },
      error: {
        checkboxPropsInternal:
          'focus:ring-red-500 group-hover:border-red-500 focus:border-red-500 data-[state="checked"]:border-red-500 data-[state="indeterminate"]:border-red-500',
      },

      normal: {
        checkboxPropsInternal: "",
      },
    },
  },

  defaultVariants: {
    color: "normal",
  },
});

function Container(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div
      {...props}
      className="p-1 w-full h-full flex items-center justify-center"
    />
  );
}

export function Checkbox({
  checked,
  onClick,
  defaultChecked,
  onCheckedChange,
  id,
  checkedIcon,
  indeterminateIcon,
  className,
  iserror,
  ...rest
}: TCheckboxProps) {
  const [situation, setSituation] = useState(checked);

  const { checkboxPropsInternal } = checkboxVariants({
    color: iserror ? "error" : "primary",
  });

  return (
    <CheckboxRadix.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(newState) => {
        setSituation(newState);
        onCheckedChange?.({
          target: {
            value: newState,
            id,
          },
        });
      }}
      className={checkboxPropsInternal({
        className,
      })}
      id={id}
      {...rest}
    >
      <CheckboxRadix.Indicator>
        {situation === "indeterminate" && (
          <Container>
            {indeterminateIcon || (
              <Icons nameIcon="indeterminate" color="#fff" />
            )}
          </Container>
        )}
        {situation && (
          <Container>{checkedIcon || <CheckIcon color="#fff" />}</Container>
        )}
      </CheckboxRadix.Indicator>
    </CheckboxRadix.Root>
  );
}
