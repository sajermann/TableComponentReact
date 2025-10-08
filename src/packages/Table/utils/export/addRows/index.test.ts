import { describe, expect, it, vi } from 'vitest';
import { addRows } from '.';

describe('packages/Table/utils/export/addRows', () => {
  it('must render', () => {
    const result = addRows({
      data: [
        {
          id: 1,
          name: 'Bruno',
        },
      ],
      defColumns: [
        {
          align: 'center',
          accessor: 'name',
          header: 'Name',
        },
      ],
    });
    expect(result).toEqual([
      [
        {
          align: 'center',
          value: 'Bruno',
          cellRender: undefined,
        },
      ],
    ]);
  });
});
