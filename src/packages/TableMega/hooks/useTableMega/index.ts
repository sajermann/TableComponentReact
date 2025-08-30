import { OnChangeFn, SortingState, TableOptions } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { Context } from '../../components/ContextProvider';

type TUseTableMegaProps = {
  enableSorting?: boolean;
  controlledSort?: {
    sort: SortingState;
    setSort: Dispatch<SetStateAction<SortingState>>;
  };
};

export function useTableMega<T>(props?: TUseTableMegaProps) {
  const { setEnableSorting, setControlledSort, ...rest } = useContext(Context);

  useEffect(() => {
    if (props?.enableSorting !== undefined) {
      setEnableSorting(props.enableSorting);
    }
    if (props?.controlledSort) {
      setControlledSort(props.controlledSort);
      rest.table.setOptions(prev => ({
        ...prev,
        sorting: props.controlledSort?.sort,
      }));
    }
  }, [props?.enableSorting]);

  return {
    ...rest,
  };
}
