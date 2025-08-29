import { describe, expect, it } from 'vitest';
import { stringToDate } from '.';

describe('Validate stringToDate', () => {
  it('Must result correct New Date with parameter correct', () => {
    const result = stringToDate('31/05/1991');
    expect(result).toEqual(new Date(1991, 4, 31));
  });

  it('Must result correct New Date with parameter null', () => {
    const result = stringToDate(null as unknown as string);
    expect(result.toDateString()).toEqual(new Date(1970).toDateString());
  });

  it('Must result correct New Date with parameter incorrect', () => {
    const result = stringToDate('31-05-1991');
    expect(result.toDateString()).toEqual(new Date(1970).toDateString());
  });
});
