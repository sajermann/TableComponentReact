import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { print } from '.';
import { buildTable } from '../buildTable';

type Any = any;

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
    const defColumns: Any = [
      { header: 'Header', align: 'left', accessor: 'foo' },
    ];

    print({ data, defColumns });

    expect(buildTable).toHaveBeenCalledWith({ data, defColumns });
  });

  it('should not throw if window.open returns null', () => {
    window.open = vi.fn(() => null);
    expect(() => print({ data: [], defColumns: [] })).not.toThrow();
  });

  it('should call print and close on windowForPrint after timeouts and onfocus', () => {
    const data = [{ foo: 'bar' }];
    const defColumns: Any = [
      { header: 'Header', align: 'left', accessor: 'foo' },
    ];

    // Chama a função print normalmente
    print({ data, defColumns });

    // Recupera a chamada do mock de window.open
    const windowForPrint = (window.open as unknown as Any).mock.results[0]
      .value;

    // Avança o timer para disparar windowForPrint.print()
    vi.runAllTimers();
    expect(windowForPrint.print).toHaveBeenCalled();

    // Simula foco na janela e avança o timer para disparar windowForPrint.close()
    if (typeof windowForPrint.onfocus === 'function') {
      windowForPrint.onfocus();
      vi.runAllTimers();
      expect(windowForPrint.close).toHaveBeenCalled();
    } else {
      throw new Error('onfocus não foi definido');
    }
  });
});
