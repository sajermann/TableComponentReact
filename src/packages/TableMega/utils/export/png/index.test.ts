import html2canvas from 'html2canvas-pro';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { png } from '.';
import { buildTable } from '../buildTable';
import { download } from '../download';

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

vi.mock('../download');

describe('packages/Table/utils/export/png', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clean up DOM if anything left
    document.body.innerHTML = '';
  });

  it('should build table, append to body and remove after png is created', async () => {
    await png({ data: [], defColumns: [] });

    // buildTable is called once
    expect(buildTable).toHaveBeenCalledWith({
      data: [],
      defColumns: [],
    });
    const table = document.createElement('table');
    table.id = 'tempTable';
    expect(html2canvas).toHaveBeenCalledWith(table);
    expect(download).toHaveBeenCalledWith(
      'data:image/png;base64,mockimage',
      'png',
    );
    expect(document.querySelector('#tempTable')).toBeNull();
  });

  it('should handle defColumns parameter correctly', async () => {
    const defColumns = [{ header: 'Col', align: 'left', accessor: 'a' }] as any;
    await png({ data: [{ a: 1 }], defColumns });
    expect(buildTable).toHaveBeenCalledWith({ data: [{ a: 1 }], defColumns });
  });
});
