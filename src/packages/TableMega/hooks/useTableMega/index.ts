import {
  OnChangeFn,
  SortingState,
  TableOptions,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Context } from '../../components/ContextProvider';

type TUseTableMegaProps = {};

export function useTableMega(props?: TUseTableMegaProps) {
  const { ...rest } = useContext(Context);

  return {
    ...rest,
  };
}
