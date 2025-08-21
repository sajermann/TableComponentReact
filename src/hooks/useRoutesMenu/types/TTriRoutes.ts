import { TRoutesMenu } from '~/types';

export type TTriRoutes = {
  actual?: TRoutesMenu | null;
  prev?: TRoutesMenu | null;
  next?: TRoutesMenu | null;
};
