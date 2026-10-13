import { useContext } from 'react';
import {
  Context,
  TContextProviderType,
} from '../../components/ContextProvider';

type TUseTableMegaProps = {};

export function useTableMega<T = unknown>(props?: TUseTableMegaProps) {
  const context = useContext(Context);

  return context as unknown as TContextProviderType<T>;
}
