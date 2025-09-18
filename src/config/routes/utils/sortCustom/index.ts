import { TRoutesMenu } from '~/types';

type TSort = {
  staticData?: {
    routerName?: string;
    order?: number;
  };
};

export const _sortCustomName = (a: TSort, b: TSort) => {
  if (!a.staticData?.routerName || !b.staticData?.routerName) {
    return 0;
  }
  if (a.staticData.routerName < b.staticData.routerName) {
    return -1;
  }
  if (a.staticData.routerName > b.staticData.routerName) {
    return 1;
  }
  return 0;
};

export const _sortCustomOrder = (a: TSort, b: TSort) => {
  if ((a.staticData?.order ?? 9999999) < (b.staticData?.order ?? 9999999)) {
    return -1;
  }
  if ((a.staticData?.order ?? 9999999) > (b.staticData?.order ?? 9999999)) {
    return 1;
  }
  return 0;
};
