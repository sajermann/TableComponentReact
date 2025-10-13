import { describe, expect, it, vi } from 'vitest';
import { removeProp } from '.';

describe('packages/TableMega/utils/removePro', () => {
  it('should remove props', () => {
    const result = removeProp({ isActive: true }, ['isError']);
    expect(result).toEqual({ isActive: true });

    const result2 = removeProp({ isActive: true, isError: false }, ['isError']);
    expect(result2).toEqual({ isActive: true });

    const result3 = removeProp({ isError: false }, ['isError']);
    expect(result3).toEqual({});
  });
});
