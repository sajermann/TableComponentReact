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

type TColumnSort = Array<{ desc: boolean; id: string }>;

type TUseTableMegaProps = {
  // enableSorting?: boolean;
  // controlledSort?: {
  //   sort: TColumnSort;
  //   setSort: Dispatch<SetStateAction<SortingState>>;
  // };
};

export function useTableMega<T>(props?: TUseTableMegaProps) {
  const { ...rest } = useContext(Context);

  // useEffect(() => {
  //   if (props?.enableSorting !== undefined) {
  //     // setEnableSorting(props.enableSorting);
  //     console.log(`vai ativar getSortedRowModel`);
  //     rest.table.setOptions(prev => ({
  //       ...prev,
  //       getSortedRowModel: getSortedRowModel(),
  //     }));
  //   }
  //   if (props && props.controlledSort && props.controlledSort.sort) {
  //     console.log(`vai ativar setControlledSort`);
  //     setControlledSort(props.controlledSort);
  //     rest.table.setState(prev => ({
  //       ...prev,
  //       sorting: props.controlledSort!.sort,
  //     }));
  //     rest.table.setOptions(prev => ({
  //       ...prev,
  //       onSortingChange: props?.controlledSort?.setSort,
  //       // getSortedRowModel: getSortedRowModel(),
  //     }));
  //   }
  // }, [props?.enableSorting, props?.controlledSort]);

  return {
    ...rest,
  };
}
