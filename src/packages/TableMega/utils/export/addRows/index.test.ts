import { describe, expect, it, vi } from 'vitest';
import { addRows } from '.';

describe('packages/Table/utils/export/addRows', () => {
  it('must render', () => {
    const result = addRows({
      data: [
        {
          id: 1,
          name: 'Bruno',
          age: 99,
        },
        {
          id: 2,
          name: 'Marcia',
          age: 99,
        },
      ],
      defColumns: [
        {
          align: 'center',
          accessor: 'name',
          header: 'Name',
          accessorFn: ({ valueCell }) => `Test - ${valueCell}`,
        },
        {
          align: 'center',
          accessor: 'age',
          header: 'Age',
        },
      ],
    });
    expect(result).toEqual([
      [
        {
          align: 'center',
          value: 'Test - Bruno',
          cellRender: undefined,
        },
        {
          align: 'center',
          cellRender: undefined,
          value: 99,
        },
      ],
      [
        {
          align: 'center',
          cellRender: undefined,
          value: 'Test - Marcia',
        },
        {
          align: 'center',
          cellRender: undefined,
          value: 99,
        },
      ],
    ]);
  });
});
