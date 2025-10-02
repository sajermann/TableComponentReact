import { TFunction } from 'i18next';
import { Dispatch, SetStateAction } from 'react';
import { TBreadcrumb } from '~/hooks/useBreadcrumbs/types';

const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

type TBuildBreadcrumbsProps = {
  matchs: any;
  setBreadcrumbs: Dispatch<SetStateAction<TBreadcrumb[]>>;
  translate: TFunction<'translation', undefined>;
};
export const buildBreadcrumbs = ({
  matchs,
  setBreadcrumbs,
  translate,
}: TBuildBreadcrumbsProps) => {
  document.title = APPLICATION_NAME;
  if (matchs.length < 3) {
    setBreadcrumbs([]);
    return;
  }

  const results = [
    {
      label: 'HOME',
      link: '/',
    },
  ];

  for (const [index, route] of matchs.entries()) {
    if (index > 0 && route && route?.staticData?.routerName) {
      results.push({
        label: route?.staticData.routerName,
        link: route.pathname,
      });
    }

    if (route?.staticData?.routerName) {
      document.title = `${translate(route.staticData.routerName)} | ${APPLICATION_NAME}`;
    }
  }
  setBreadcrumbs(results);
};
