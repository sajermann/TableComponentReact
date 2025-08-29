/**
 * ### isValidDate
 * Verify if date is valid
 * Warning: For Javascript new Date(2022, 1, 31) is Thu Mar 03 2022 00:00:00 GMT-0300,
 * if you look for something more assertive try: isValidDateDeep()
 * @example
 * ```js
 * isValidDate(new Date(2022, 1, 1)) // returns: true
 * isValidDate(new Date(2022, 1, 32)) // returns: true
 * isValidDate(undefined as unknown as Date) // returns: false
 * ```
 */
export function isValidDate(date: Date): boolean {
  try {
    if (date.toString() === 'Invalid Date') {
      return false;
    }
    return date instanceof Date && !Number.isNaN(date);
  } catch {
    return false;
  }
}
