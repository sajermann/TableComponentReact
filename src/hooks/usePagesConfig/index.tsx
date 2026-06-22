import { useMatches, useRouter, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useBreadcrumbs, useTranslation } from "..";
import { useOtherComponents } from "../useOtherComponents";
import { buildBreadcrumbs } from "./utils/buildBreadcrumbs";
import { buildOtherComponents } from "./utils/buildOtherComponents";

export function usePagesConfig() {
  const { translate, currentLanguage } = useTranslation();
  const { setOtherComponents } = useOtherComponents();
  const { setBreadcrumbs } = useBreadcrumbs();
  const matchs = useMatches();
  const { routesById } = useRouter();
  const { pathname } = useLocation();
  const routes = Object.values(routesById);
  useEffect(() => {
    buildBreadcrumbs({ matchs, setBreadcrumbs, translate });
    buildOtherComponents({ routes, pathname, setOtherComponents });
  }, [matchs, currentLanguage]);
}
