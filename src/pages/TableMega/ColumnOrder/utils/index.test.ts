import { describe, expect, it, vi } from 'vitest';
import { handleChangeOrder } from '.';

// Description: Helper function to create column order arrays for test cases.
const createOrder = () => [
  { id: 'a', content: 'Column A' },
  { id: 'b', content: 'Column B' },
  { id: 'c', content: 'Column C' },
];

describe('pages/TableMega/ColumnOrder/utils/handleChangeOrder', () => {
  // Description: Swaps columns when both IDs are found.
  it('swaps two columns if both IDs are valid', () => {
    const setColumnOrder = vi.fn();
    const columnOrder = createOrder();

    handleChangeOrder({
      currentId: 'a',
      targetId: 'c',
      columnOrder,
      setColumnOrder,
    });

    // Order should swap 'a' and 'c'
    expect(setColumnOrder).toHaveBeenCalledWith([
      { id: 'c', content: 'Column C' },
      { id: 'b', content: 'Column B' },
      { id: 'a', content: 'Column A' },
    ]);
  });

  // Description: Does not change order if any ID is not found.
  it('does nothing if currentId is not found', () => {
    const setColumnOrder = vi.fn();
    const columnOrder = createOrder();

    handleChangeOrder({
      currentId: 'x',
      targetId: 'c',
      columnOrder,
      setColumnOrder,
    });

    // No swap should occur, same order
    expect(setColumnOrder).not.toBeCalled();
  });

  // Description: Does nothing if targetId is not found.
  it('does nothing if targetId is not found', () => {
    const setColumnOrder = vi.fn();
    const columnOrder = createOrder();

    handleChangeOrder({
      currentId: 'a',
      targetId: 'x',
      columnOrder,
      setColumnOrder,
    });

    // No swap should occur, same order
    expect(setColumnOrder).not.toBeCalled();
  });

  // Description: Edge case, swaps the same column if IDs match.
  it('swaps when currentId and targetId are the same', () => {
    const setColumnOrder = vi.fn();
    const columnOrder = createOrder();

    handleChangeOrder({
      currentId: 'b',
      targetId: 'b',
      columnOrder,
      setColumnOrder,
    });

    // No real change, but function performs a swap
    expect(setColumnOrder).toHaveBeenCalledWith(columnOrder);
  });
});
