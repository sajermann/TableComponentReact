import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildTable } from '../buildTable';
import { download } from '../download';

import { print } from '.';

// Mock buildTable to return a table element
vi.mock('../buildTable', () => ({
  buildTable: vi.fn(() => {
    const el = document.createElement('table');
    return el;
  }),
}));

describe('packages/Table/utils/export/print', () => {
  let originalWindowOpen: typeof window.open;

  beforeEach(() => {
    vi.useFakeTimers();
    originalWindowOpen = window.open;

    // Mock window.open to return a mock window object with document and print method
    window.open = vi.fn(() => {
      const body = document.createElement('body');
      return {
        document: { body },
        print: vi.fn(),
        close: vi.fn(),
        onfocus: null as (() => void) | null,
      } as unknown as Window;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    window.open = originalWindowOpen;
    vi.clearAllMocks();
  });

  it('should build table with data and defColumns', () => {
    const data = [{ foo: 'bar' }];
    const defColumns = [
      { header: 'Header', align: 'left', accessor: 'foo' },
    ] as any;

    print({ data, defColumns });

    expect(buildTable).toHaveBeenCalledWith({ data, defColumns });
  });

  // it('should open window, append table, call print and close on focus', () => {
  //   print({ data: [], defColumns: [] });

  //   const printWindow = window.open() as any;

  //   // Table should be appended to print window document.body
  //   expect(printWindow.document.body.children[0].tagName).toBe('TABLE');

  //   // print should not be called immediately
  //   expect(printWindow.print).not.toHaveBeenCalled();

  //   // Fast-forward time 500ms for print delay
  //   vi.advanceTimersByTime(500);
  //   expect(printWindow.print).toHaveBeenCalled();

  //   // Before focus event, close should NOT be called
  //   expect(printWindow.close).not.toHaveBeenCalled();

  //   // Simulate window focus triggering onfocus handler
  //   if (printWindow.onfocus) {
  //     printWindow.onfocus();
  //   }

  //   // Close should not be called immediately after focus
  //   expect(printWindow.close).not.toHaveBeenCalled();

  //   // After another 500ms it should close
  //   vi.advanceTimersByTime(500);
  //   expect(printWindow.close).toHaveBeenCalled();
  // });

  it('should not throw if window.open returns null', () => {
    window.open = vi.fn(() => null);
    expect(() => print({ data: [], defColumns: [] })).not.toThrow();
  });
});
