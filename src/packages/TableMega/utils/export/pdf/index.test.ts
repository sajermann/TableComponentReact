import { jsPDF as JsPdf } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildTable } from '../buildTable';

import { pdf } from '.';

// Mock jspdf and autotable
const saveMock = vi.fn();

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
    vi.mocked(JsPdf).mockImplementation(function () {
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

  it('should sanitize cell text in didParseCell hook', () => {
    const data = [{ foo: 'bar' }];
    const defColumns = [
      { header: 'Header', align: 'left', accessor: 'foo' },
    ] as any;
    pdf({ data, defColumns });

    const callArgs = vi.mocked(autoTable).mock.calls[0][1];
    expect(callArgs.didParseCell).toBeDefined();

    const hookData = {
      cell: {
        text: ['\t\t\t  foo  \t  bar  \t\n', '  baz  '],
      },
    };
    callArgs.didParseCell?.(hookData as any);
    expect(hookData.cell.text).toEqual(['foo bar', 'baz']);

    const emptyHookData = {
      cell: {},
    };
    callArgs.didParseCell?.(emptyHookData as any);
    expect(emptyHookData.cell).toEqual({});
  });
});
