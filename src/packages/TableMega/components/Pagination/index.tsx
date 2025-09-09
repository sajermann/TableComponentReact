/* eslint-disable react/button-has-type */

import { Controlled } from "./Controlled";
import { Default, TPaginationDefaultProps } from "./Default";

type TPaginationProps = ((props: TPaginationDefaultProps) => JSX.Element) & {
  Default: typeof Default;
  Controlled: typeof Controlled;
};

const Pagination = ((props: TPaginationDefaultProps) => {
  return <Default {...props} />;
}) as TPaginationProps;

Pagination.Controlled = Controlled;
Pagination.Default = Default;

export { Pagination };
