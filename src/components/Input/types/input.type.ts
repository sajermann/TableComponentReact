import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { TBeforeChange } from '.';

type Input = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type TCommon = {
  isError?: boolean;
  onBeforeChange?: TBeforeChange;
};

export type TInputDebounced = Omit<Input, 'value'> &
  TCommon & {
    debounce: number;
    value?: never;
  };

export type TInputControlled = Input &
  TCommon & {
    debounce?: never;
  };

export type TInput = TInputDebounced | TInputControlled;
