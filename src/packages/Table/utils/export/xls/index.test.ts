import { beforeEach, describe, expect, it, vi } from 'vitest';
import XLSX from 'xlsx-js-style';
import { xls } from '.';

vi.mock('xlsx-js-style');
vi.mock('../download');

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

describe('packages/Table/utils/export/xls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should build headers with styles', () => {
    const data: Data[] = [];
    vi.mocked(XLSX.utils.aoa_to_sheet).mockImplementation(() => {
      return 'aoa_to_sheet' as any;
    });
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

    expect(XLSX.utils.aoa_to_sheet).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.arrayContaining([
          expect.objectContaining({ v: 'Name', s: { font: { bold: true } } }),
          expect.objectContaining({ v: 'Age', s: undefined }),
        ]),
      ]),
    );
  });
});
