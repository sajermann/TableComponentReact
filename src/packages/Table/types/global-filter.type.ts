import { FilterFnOption } from '@tanstack/react-table';
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from 'react';

export type TGlobalFilter<T> = {
  controlled?: { filter: string; setFilter: Dispatch<SetStateAction<string>> };
  globalFilterFn?: FilterFnOption<T>;
  showInput?: boolean;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};
