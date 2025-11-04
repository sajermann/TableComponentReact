import { describe, expect, it } from 'vitest';
import { verifyIndeterminate } from '.';

describe('pages/TraditionalPattern/Selection/utils', () => {
  it('should return true if all rows are selected', () => {
    const tableMock = {
      getIsAllRowsSelected: () => true,
      getIsSomeRowsSelected: () => false,
    };
    expect(verifyIndeterminate(tableMock as any)).toBe(true);
  });

  it("should return 'indeterminate' if some rows are selected", () => {
    const tableMock = {
      getIsAllRowsSelected: () => false,
      getIsSomeRowsSelected: () => true,
    };
    expect(verifyIndeterminate(tableMock as any)).toBe('indeterminate');
  });

  it('should return false if no rows are selected', () => {
    const tableMock = {
      getIsAllRowsSelected: () => false,
      getIsSomeRowsSelected: () => false,
    };
    expect(verifyIndeterminate(tableMock as any)).toBe(false);
  });
});
