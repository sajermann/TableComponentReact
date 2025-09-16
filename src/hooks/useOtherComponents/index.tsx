import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { TOtherComponents, TOtherComponentsContextType } from "./types";

const OtherComponentsContext = createContext<TOtherComponentsContextType>(
  {} as TOtherComponentsContextType
);

export function useOtherComponents() {
  return useContext(OtherComponentsContext);
}

export function OtherComponentsProvider({ children }: { children: ReactNode }) {
  const [otherComponents, setOtherComponents] = useState<TOtherComponents>({
    next: null,
    prev: null,
  });
  const memoizedValue = useMemo(
    () => ({
      otherComponents,
      setOtherComponents,
    }),
    [otherComponents]
  );

  return (
    <OtherComponentsContext.Provider value={memoizedValue}>
      {children}
    </OtherComponentsContext.Provider>
  );
}
