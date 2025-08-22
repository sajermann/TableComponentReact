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
        "dark:bg-neutral-900 border border-neutral-700",
        "dark:text-gray-100 rounded-lg px-3 py-2 pr-10",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500",
        "transition-all duration-500 shadow-sm appearance-none w-full",
      ])}
    />
  );
}

function Arrow() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
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
    <option {...props} className="dark:bg-neutral-900 dark:text-gray-100" />
  );
}

export default {
  Container,
  Select,
  Option,
  Arrow,
};
