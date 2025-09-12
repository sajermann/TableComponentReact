import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
// import { useLocation } from 'react-router';
import { useRoutesMenu } from "../useRoutesMenu";
import { useTranslation } from "../useTranslation";
import { TBreadcrumb, TBreadcrumbsContextType } from "./types";
import { _getBreadcrumbs } from "./utils";

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
