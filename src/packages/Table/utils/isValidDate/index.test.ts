import { describe, expect, it } from 'vitest';
import { isValidDate } from '.';

describe('Validate isValidDate', () => {
  it('Must result true', () => {
    const result = isValidDate(new Date('1991-05-31'));
    expect(result).toEqual(true);
  });

  it('Must result false', () => {
    const result = isValidDate(new Date('Test'));
    expect(result).toEqual(false);
  });

  it('Must result false (throw)', () => {
    const result = isValidDate(undefined as unknown as Date);
    expect(result).toEqual(false);
  });
});
