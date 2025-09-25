/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { exportTo } from '.';

describe('packages/TableMega/utils/export', () => {
  it(`should convert object to query correctly - 1 prop`, async () => {
    exportTo.csv({
      data: [{ id: '1' }],
      defColumns: [
        {
          header: 'Id',

          accessor: 'id',
        },
      ],
    });

    exportTo.xls({
      data: [{ id: '1' }],
      defColumns: [
        {
          header: 'Id',

          accessor: 'id',
        },
      ],
    });

    exportTo.print({
      data: [{ id: '1' }],
      defColumns: [
        {
          header: 'Id',

          accessor: 'id',
        },
      ],
    });

    exportTo.xml({
      data: [{ id: '1' }],
      defColumns: [
        {
          header: 'Id',

          accessor: 'id',
        },
      ],
    });

    exportTo.pdf({
      data: [{ id: '1' }],
      defColumns: [
        {
          header: 'Id',

          accessor: 'id',
        },
      ],
    });

    exportTo.png({
      data: [{ id: '1' }],
      defColumns: [
        {
          header: 'Id',

          accessor: 'id',
        },
      ],
    });
  });
});
