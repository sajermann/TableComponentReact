import { isValidDate } from '../';

/**
 * ### StringToDate
 * Convert string to new Date
 * @example
 * ```js
 * stringToDate("31/05/1991") // returns: Fri May 31 1991 00:00:00 GMT-0300
 * stringToDate(null as unknown as string) // returns: Wed Dec 31 1969 21:00:01 GMT-0300
 * ```
 */
export function stringToDate(data: string): Date {
  try {
    const arrayValues = data.split('/');
    const year = parseInt(arrayValues[2], 10);
    const month = parseInt(arrayValues[1], 10) - 1;
    const day = parseInt(arrayValues[0], 10);
    const result = new Date(year, month, day);
    if (!isValidDate(result)) {
      return new Date(1970);
    }
    return result;
  } catch {
    return new Date(1970);
  }
}
