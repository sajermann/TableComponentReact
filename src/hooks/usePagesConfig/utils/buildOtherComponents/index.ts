import { Dispatch, SetStateAction } from 'react';
import { TOtherComponents } from '~/hooks/useOtherComponents/types';

type TBuildOtherComponentsProps = {
  flatRoutes: any;
  setOtherComponents: Dispatch<SetStateAction<TOtherComponents>>;
};

export const buildOtherComponents = ({
  flatRoutes,
  setOtherComponents,
}: TBuildOtherComponentsProps) => {
  const currentRoute = flatRoutes.find(
    (route: { _fullPath: string }) => route._fullPath === location.pathname,
  );

  const prevRoute = flatRoutes.find(
    (route: { rank: number }) => route.rank === currentRoute?.rank - 1,
  );
  const nextRoute = flatRoutes.find(
    (route: { rank: number }) => route.rank === currentRoute?.rank + 1,
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
