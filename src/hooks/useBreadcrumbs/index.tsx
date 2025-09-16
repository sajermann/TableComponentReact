import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { TBreadcrumb, TBreadcrumbsContextType } from "./types";

const BreadcrumbsContext = createContext<TBreadcrumbsContextType>(
  {} as TBreadcrumbsContextType
);

export function useBreadcrumbs() {
  return useContext(BreadcrumbsContext);
}

export function BreadcrumbsProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumb[]>([]);
  const memoizedValue = useMemo(
    () => ({
      breadcrumbs,
      setBreadcrumbs,
    }),
    [breadcrumbs]
  );

  return (
    <BreadcrumbsContext.Provider value={memoizedValue}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}
