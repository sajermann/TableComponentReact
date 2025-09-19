import {
  DetailedHTMLProps,
  HTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import { managerClassNames } from "~/utils";

function Container(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return <div {...props} className="relative" />;
}

function Select(
  props: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
) {
  return (
    <select
      {...props}
      className={managerClassNames([
        "group outline-none focus:ring-1 border border-black dark:border-white h-11 py-1 px-2 rounded w-full bg-transparent",
        "transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
        "focus:ring-blue-500 group-hover:border-blue-500 focus:border-blue-500",
        "required:invalid:text-gray-400",
        { [props.className as string]: !!props.className },
      ])}
    />
  );
}

function Arrow() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Option(
  props: DetailedHTMLProps<
    OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >
) {
  return (
    <option
      {...props}
      className={managerClassNames([
        "dark:bg-neutral-900 dark:text-gray-100 disabled:opacity-5",
        { [props.className as string]: props.className },
      ])}
    />
  );
}

function Placeholder(
  props: DetailedHTMLProps<
    OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >
) {
  return <Option {...props} disabled selected className="hidden" value="" />;
}

export default {
  Container,
  Select,
  Option,
  Arrow,
  Placeholder,
};
