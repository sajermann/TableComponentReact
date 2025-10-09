import { jsPDF as JsPdf } from 'jspdf';
import autoTable, { applyPlugin } from 'jspdf-autotable';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { pdf } from '.';

import { buildTable } from '../buildTable';
import { download } from '../download';

// Mock jspdf and autotable
const saveMock = vi.fn();
const autoTableMock = vi.fn();
const applyPluginMock = vi.fn();

vi.mock('jspdf');
vi.mock('jspdf-autotable');

// Mock buildTable
vi.mock('../buildTable', () => ({
  buildTable: vi.fn(() => document.createElement('table')),
}));

describe('packages/Table/utils/export/pdf', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Restaura timers e datas reais após cada teste
    vi.useRealTimers();
  });

  it('should call buildTable with data and columns', () => {
    const mockDate = new Date();
    vi.setSystemTime(mockDate);
    vi.mocked(JsPdf).mockImplementation(() => {
      return {
        save: saveMock,
      } as any;
    });
    const data = [{ foo: 'bar' }];
    const defColumns = [
      { header: 'Header', align: 'left', accessor: 'foo' },
    ] as any;
    pdf({ data, defColumns });

    expect(saveMock).toHaveBeenCalledWith(`Data-${mockDate.toISOString()}.pdf`);
    expect(buildTable).toHaveBeenCalledWith({ data, defColumns });
  });
});
