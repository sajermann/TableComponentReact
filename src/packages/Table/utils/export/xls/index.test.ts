import { beforeEach, describe, expect, it, vi } from 'vitest';
import { xls } from '.';

vi.mock('xlsx-js-style', () => ({
  utils: {
    aoa_to_sheet: vi.fn(aoa => 'sheet-mock'),
  },
  write: vi.fn(() => new Uint8Array([1, 2, 3])),
}));

vi.mock('../download', () => ({
  download: vi.fn(),
}));

type Data = { name: string; age: number };

const defColumns = [
  {
    header: 'Name',
    accessor: 'name',
    typeCell: 's',
    styleHeaderCellFn: vi.fn(() => ({ font: { bold: true } })),
    styleCellFn: vi.fn(() => ({ fill: { fgColor: { rgb: 'FFFF00' } } })),
  },
  {
    header: 'Age',
    accessor: 'age',
    typeCell: 'n',
  },
] as any;

describe('xls function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should build headers with styles', () => {
    const data: Data[] = [];
    xls({ data, defColumns });

    expect(defColumns[0].styleHeaderCellFn).toHaveBeenCalledWith(
      expect.objectContaining({
        valueHeader: 'Name',
        currentDefinition: defColumns[0],
        definitions: defColumns,
        index: 0,
      }),
    );
    expect(defColumns[1].styleHeaderCellFn).toBeUndefined();

    const XLSX = require('xlsx-js-style');
    expect(XLSX.utils.aoa_to_sheet).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.arrayContaining([
          expect.objectContaining({ v: 'Name', s: { font: { bold: true } } }),
          expect.objectContaining({ v: 'Age', s: undefined }),
        ]),
      ]),
    );
  });

  it('should build rows with accessorFn and cell styles', () => {
    const data: Data[] = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];

    const customDefColumns = defColumns.map(col => ({
      ...col,
      accessorFn:
        col.accessor === 'name'
          ? ({ valueCell }: any) => valueCell.toUpperCase()
          : undefined,
    }));

    xls({ data, defColumns: customDefColumns });
    const XLSX = require('xlsx-js-style');
    const sheetArg = XLSX.utils.aoa_to_sheet.mock.calls[0][0];
    expect(sheetArg.flat().some((cell: any) => cell.v === 'ALICE')).toBe(true);
    expect(sheetArg.flat().some((cell: any) => cell.v === 'BOB')).toBe(true);
  });

  it('should write workbook and call download with correct blob type', () => {
    const data: Data[] = [{ name: 'Alex', age: 40 }];
    xls({ data, defColumns });

    const XLSX = require('xlsx-js-style');
    const { download } = require('../download');
    expect(XLSX.write).toHaveBeenCalledWith(
      expect.objectContaining({
        Sheets: { data: 'sheet-mock' },
        SheetNames: ['data'],
      }),
      { bookType: 'xlsx', type: 'array' },
    );
    expect(download).toHaveBeenCalled();
    const blob = download.mock.calls[0][0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    );
  });

  it('should handle empty data and defColumns without error', () => {
    xls({ data: [], defColumns: [] });
    const { download } = require('../download');
    expect(download).toHaveBeenCalled();
  });
});
