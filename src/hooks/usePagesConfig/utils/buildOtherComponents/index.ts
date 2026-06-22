import { Dispatch, SetStateAction } from 'react';
import { TOtherComponents } from '~/hooks/useOtherComponents/types';

type TAny = any;

type TBuildOtherComponentsProps = {
  routes: TAny;
  pathname: string;
  setOtherComponents: Dispatch<SetStateAction<TOtherComponents>>;
};

export const buildOtherComponents = ({
  routes,
  pathname,
  setOtherComponents,
}: TBuildOtherComponentsProps) => {
  if (!pathname) {
    setOtherComponents({
      prev: null,
      next: null,
    });
    return;
  }
  const allRoutes = routes
    .filter((route: TAny) => route.options?.staticData?.routerName) // apenas rotas com nome
    .sort((a: TAny, b: TAny) => {
      return a.fullPath.localeCompare(b.fullPath);
    });

  const currentIndex = allRoutes.findIndex(
    (route: TAny) => route._fullPath === pathname,
  );
  const prevRoute = allRoutes[currentIndex - 1];
  const nextRoute = allRoutes[currentIndex + 1];

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
