import { ContextProvider, TContextProviderProps } from '../ContextProvider';

type TRootProps<
  T extends Record<string, unknown>,
  U = undefined,
> = TContextProviderProps<T, U>;

export function Root<T extends Record<string, unknown>, U = undefined>(
  props: TRootProps<T, U>,
) {
  return <ContextProvider {...props} />;
}
