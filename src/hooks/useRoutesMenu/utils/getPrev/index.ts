import { TRoutesMenu } from '~/types/TRoutesMenu';

export function _getPrev(
  options: TRoutesMenu[],
  indexOpt: number,
): TRoutesMenu | null {
  const prev = options[indexOpt - 1] || null;
  const realPrev = prev?.hide?.otherComponents
    ? _getPrev(options, indexOpt - 1)
    : prev;
  return realPrev;
}
