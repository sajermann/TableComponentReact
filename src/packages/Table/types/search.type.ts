import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type TSearchProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  show?: boolean;
};
