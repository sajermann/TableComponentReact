import { useLocation, useMatches, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useBreadcrumbs, useTranslation } from "..";
import { useOtherComponents } from "../useOtherComponents";

const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

export function usePagesConfig() {
  const { translate, currentLanguage } = useTranslation();
  const { setOtherComponents } = useOtherComponents();
  const { setBreadcrumbs } = useBreadcrumbs();
  const matchs = useMatches();
  const { flatRoutes } = useRouter();
  const location = useLocation();

  const buildOtherComponents = () => {
    const currentRoute = flatRoutes.find(
      (route: { _fullPath: string }) => route._fullPath === location.pathname
    );

    const prevRoute = flatRoutes.find(
      (route: { rank: number }) => route.rank === currentRoute?.rank - 1
    );
    const nextRoute = flatRoutes.find(
      (route: { rank: number }) => route.rank === currentRoute?.rank + 1
    );

    setOtherComponents({
      prev: prevRoute?.options?.staticData?.routerName
        ? {
            label: prevRoute.options?.staticData?.routerName,
            path: prevRoute._fullPath,
          }
        : null,
      next: nextRoute?.options?.staticData?.routerName
        ? {
            label: nextRoute.options?.staticData?.routerName,
            path: nextRoute._fullPath,
          }
        : null,
    });
  };

  const buildBreadcrumbs = () => {
    document.title = APPLICATION_NAME;
    if (matchs.length < 3) {
      setBreadcrumbs([]);
      return;
    }

    const results = [
      {
        label: "HOME",
        link: "/",
      },
    ];

    for (const [index, route] of matchs.entries()) {
      if (index > 0 && route && route?.staticData.routerName) {
        results.push({
          label: route?.staticData.routerName,
          link: route.pathname,
        });
      }

      if (route?.staticData.routerName) {
        document.title = `${translate(route.staticData.routerName)} | ${APPLICATION_NAME}`;
      }
    }
    setBreadcrumbs(results);
  };

  useEffect(() => {
    buildBreadcrumbs();
    buildOtherComponents();
  }, [matchs, currentLanguage]);
}
