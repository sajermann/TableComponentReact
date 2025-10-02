import { useMatches, useRouter } from "@tanstack/react-router";
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
  const { flatRoutes } = useRouter();

  useEffect(() => {
    buildBreadcrumbs({ matchs, setBreadcrumbs, translate });
    buildOtherComponents({ flatRoutes, setOtherComponents });
  }, [matchs, currentLanguage]);
}
