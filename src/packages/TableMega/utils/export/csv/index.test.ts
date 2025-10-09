import { beforeEach, describe, expect, it, vi } from 'vitest';
import XLSX from 'xlsx-js-style';
import { csv } from '.';
import { TDefCsv } from '../../../types';
import { download } from '../download';

vi.mock('xlsx-js-style');
vi.mock('../download');

type Data = { a: number; b: number };

const defColumns: TDefCsv<Data>[] = [
  { header: 'colA', accessor: 'a' },
  {
    header: 'colB',
    accessor: 'b',
    accessorFn: ({ valueCell }) => `Test - ${valueCell}`,
  },
];

describe('packages/Table/utils/export/csv', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('must generate CSV and call download', () => {
    const data: Data[] = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ];
    vi.mocked(XLSX.utils.json_to_sheet).mockImplementation(() => {
      return 'json_to_sheet' as any;
    });
    vi.mocked(XLSX.utils.sheet_to_csv).mockImplementation(() => {
      return 'sheet_to_csv' as any;
    });

    csv({ data, defColumns });

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([
      { colA: 1, colB: `Test - ${data[0].b}` },
      { colA: 3, colB: `Test - ${data[1].b}` },
    ]);

    expect(XLSX.utils.sheet_to_csv).toHaveBeenCalledWith('json_to_sheet', {
      FS: ';',
    });

    expect(download).toHaveBeenCalledWith(new Blob(), 'csv');
  });

  it('must respect custom delimiter', () => {
    const data: Data[] = [{ a: 5, b: 6 }];
    vi.mocked(XLSX.utils.json_to_sheet).mockImplementation(() => {
      return 'json_to_sheet' as any;
    });
    vi.mocked(XLSX.utils.sheet_to_csv).mockImplementation(() => {
      return 'sheet_to_csv' as any;
    });
    csv({ data, defColumns, delimiter: ',' });
    expect(XLSX.utils.sheet_to_csv).toHaveBeenCalledWith('json_to_sheet', {
      FS: ',',
    });
  });
});
