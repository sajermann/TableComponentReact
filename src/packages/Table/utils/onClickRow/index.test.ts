/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest';
import { onClickRow } from '.';

describe('Utils/Table/OnClickRow', () => {
  it(`should fire toggleSelectedMock`, async () => {
    onClickRow({
      row: undefined,
      selection: undefined,
    }); // Line Coverage
    const toggleSelectedMock = vi.fn();
    onClickRow({
      row: {
        toggleSelected: toggleSelectedMock,
      },
      selection: {
        disableSelectionRow: undefined,
      },
    } as any);

    expect(toggleSelectedMock).toBeCalled();
  });

  it(`should fire disableSelectionRow`, async () => {
    onClickRow({
      row: undefined,
      selection: undefined,
    }); // Line Coverage
    const disableSelectionRowMock = vi.fn();
    onClickRow({
      row: {
        toggleSelected: vi.fn(),
      },
      selection: {
        disableSelectionRow: disableSelectionRowMock,
      },
    } as any);

    expect(disableSelectionRowMock).toBeCalled();
  });
});
