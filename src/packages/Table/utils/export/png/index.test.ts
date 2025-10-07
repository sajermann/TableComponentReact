import { beforeEach, describe, expect, it, vi } from 'vitest';
import { png } from '.';

vi.mock('../buildTable', () => ({
  buildTable: vi.fn(() => {
    const el = document.createElement('table');
    return el;
  }),
}));

vi.mock('html2canvas-pro', () => ({
  __esModule: true,
  default: vi.fn(() =>
    Promise.resolve({
      toDataURL: vi.fn(() => 'data:image/png;base64,mockimage'),
    }),
  ),
}));

vi.mock('../download', () => ({
  download: vi.fn(),
}));

describe('png function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clean up DOM if anything left
    document.body.innerHTML = '';
  });

  it('should build table, append to body and remove after png is created', async () => {
    await png({ data: [], defColumns: [] });

    const { buildTable } = require('../buildTable');
    const html2canvas = require('html2canvas-pro').default;
    const { download } = require('../download');

    // buildTable is called once
    expect(buildTable).toHaveBeenCalledWith({ data: [], defColumns: [] });

    // Table is appended to body with id 'tempTable'
    const tableInDom = document.querySelector('#tempTable');
    expect(tableInDom).toBeTruthy();

    // html2canvas called with the table element
    expect(html2canvas).toHaveBeenCalledWith(tableInDom);

    // download called with the PNG data URL and 'png' extension
    expect(download).toHaveBeenCalledWith(
      'data:image/png;base64,mockimage',
      'png',
    );

    // After promise resolves, table is removed from DOM
    expect(document.querySelector('#tempTable')).toBeNull();
  });

  it('should handle defColumns parameter correctly', async () => {
    const defColumns = [{ header: 'Col', align: 'left', accessor: 'a' }] as any;
    await png({ data: [{ a: 1 }], defColumns });

    const { buildTable } = require('../buildTable');
    expect(buildTable).toHaveBeenCalledWith({ data: [{ a: 1 }], defColumns });
  });
});
