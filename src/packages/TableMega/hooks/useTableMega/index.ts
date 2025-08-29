import { useContext, useEffect } from 'react';
import { Context } from '../../components/ContextProvider';

export function useTableMega() {
  const props = useContext(Context);

  return {
    ...props,
  };
}
