import { beforeEach, describe, expect, it, vi } from 'vitest';
import { pdf } from '..';

// Mock jspdf and autotable
const saveMock = vi.fn();
const autoTableMock = vi.fn();
const applyPluginMock = vi.fn();

vi.mock('jspdf', () => ({
  jsPDF: vi.fn(() => ({
    save: vi.fn(),
  })),
}));

vi.mock('jspdf-autotable', () => ({
  default: autoTableMock,
  applyPlugin: applyPluginMock,
  __esModule: true,
}));

// Mock buildTable
vi.mock('../buildTable', () => ({
  buildTable: vi.fn(() => document.createElement('table')),
}));

describe('pdf function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call buildTable with data and columns', () => {
    const data = [{ foo: 'bar' }];
    const defColumns = [
      { header: 'Header', align: 'left', accessor: 'foo' },
    ] as any;
    pdf({ data, defColumns });

    const { buildTable } = require('../buildTable');
    expect(buildTable).toHaveBeenCalledWith({ data, defColumns });
  });

  it('should apply the jsPDF plugin', () => {
    pdf({ data: [], defColumns: [] });
    expect(applyPluginMock).toHaveBeenCalled();
  });

  it('should create a PDF document and save it', () => {
    pdf({ data: [], defColumns: [] });

    const { jsPDF } = require('jspdf');
    expect(jsPDF).toHaveBeenCalledWith({
      orientation: 'l',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16,
    });

    expect(autoTableMock).toHaveBeenCalledWith(expect.anything(), {
      html: expect.any(HTMLTableElement),
    });

    expect(saveMock).toHaveBeenCalledWith(
      expect.stringMatching(/^Data-\d{4}-\d{2}-\d{2}T.*\.pdf$/),
    );
  });
});
