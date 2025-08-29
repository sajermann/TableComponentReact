import { DetailedHTMLProps, TableHTMLAttributes } from "react";

export function Table(
  props: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >
) {
  return (
    <table
      {...props}
      className={`border-collapse border-spacing-0 table-fixed w-full ${
        props.className ? props.className : ""
      }`}
    />
  );
}
