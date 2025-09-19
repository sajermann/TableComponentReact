import { Dispatch, SetStateAction } from 'react';

export type TPaginationControlled = {
  rowCount?: number;
  pageIndex?: number;
  pageSize?: number;
  onChange?: Dispatch<
    SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
};

export type TPagination = {
  disabledActions?: boolean;
  automatic?: boolean | { controlled?: TPaginationControlled };
  manual?: TPaginationControlled;
};
