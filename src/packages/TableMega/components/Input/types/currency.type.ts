import { TRealFormat } from '.';

export type TCurrency = {
  currency: Pick<TRealFormat, 'value' | 'decimalPlace'>;
};
