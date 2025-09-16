import { useLocation, useMatches, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useBreadcrumbs } from "..";
import { useOtherComponents } from "../useOtherComponents";

const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

export function usePagesConfig() {
  const { setOtherComponents } = useOtherComponents();
  const { setBreadcrumbs } = useBreadcrumbs();
  const matchs = useMatches();
  const { flatRoutes } = useRouter();
  const location = useLocation();

  useEffect(() => {
    if (matchs.length < 3) {
      setBreadcrumbs([]);
    }

    const results = [
      {
        label: "Home",
        link: "/",
      },
    ];

    document.title = APPLICATION_NAME;

    for (const [index, route] of matchs.entries()) {
      if (index > 0 && route && route?.staticData.routerName) {
        results.push({
          label: route?.staticData.routerName,
          link: route.pathname,
        });
      }

      if (route?.staticData.routerName) {
        document.title = `${route.staticData.routerName} | ${APPLICATION_NAME}`;
      }
    }
    setBreadcrumbs(results);

    const currentRoute = flatRoutes.find(
      (route) => route._fullPath === location.pathname
    );

    const prevRoute = flatRoutes.find(
      (route) => route.rank === currentRoute.rank - 1
    );
    const nextRoute = flatRoutes.find(
      (route) => route.rank === currentRoute.rank + 1
    );

    console.log({ flatRoutes, currentRoute, prevRoute, nextRoute });

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
  }, [matchs]);
}
