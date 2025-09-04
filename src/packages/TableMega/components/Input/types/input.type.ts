import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { TBeforeChange } from '.';

export type TInput = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  iserror?: boolean;
  onBeforeChange?: TBeforeChange;
  debounce?: number;
};
