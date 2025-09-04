import { ContextProvider, TContextProviderProps } from "../ContextProvider";

type TRootProps<T, U = undefined> = TContextProviderProps<T, U>;

export function Root<T, U = undefined>(props: TRootProps<T, U>) {
  return <ContextProvider {...props} />;
}
