import { act, render, renderHook } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useColumnVisibility } from '.';

// Mock hooks for translation and columns
vi.mock('~/hooks', () => ({
  useTranslation: () => ({
    translate: (key: string) => {
      const dict: Record<string, string> = {
        NAME: 'Name',
        LAST_NAME: 'Last Name',
        BIRTHDAY: 'Birthday',
        ROLE: 'Role',
        ACTIVE: 'Active',
      };
      return dict[key] ?? key;
    },
  }),
  useColumns: () => ({
    columns: [
      { id: 'id', header: 'ID Header' },
      { id: 'avatar', header: 'Avatar Header' },
      // More columns can be added as needed
    ],
  }),
}));

describe('pages/TableMega/ColumnOrder/utils/hooks/useColumnVisibility', () => {
  it('initializes options with translated labels and all shown', () => {
    const { result } = renderHook(() => useColumnVisibility());
    const { options } = result.current;

    expect(options).toEqual([
      { id: 'id', label: 'Id', show: true },
      { id: 'avatar', label: 'Avatar', show: true },
      { id: 'name', label: 'Name', show: true },
      { id: 'lastName', label: 'Last Name', show: true },
      { id: 'birthday', label: 'Birthday', show: true },
      { id: 'email', label: 'Email', show: true },
      { id: 'role', label: 'Role', show: true },
      { id: 'isActive', label: 'Active', show: true },
    ]);
  });

  it('computes columnVisibility correctly from options', () => {
    const { result } = renderHook(() => useColumnVisibility());
    const { columnVisibility } = result.current;

    expect(columnVisibility).toEqual({
      id: true,
      avatar: true,
      name: true,
      lastName: true,
      birthday: true,
      email: true,
      role: true,
      isActive: true,
    });
  });

  it('handleCheck updates options correctly when toggling show', () => {
    const { result } = renderHook(() => useColumnVisibility());
    act(() => {
      result.current.handleCheck({ value: false, id: 'name' });
    });

    // The 'name' option show property should be false now
    expect(result.current.options.find(o => o.id === 'name')?.show).toBe(false);

    // Other options remain true
    expect(result.current.options.find(o => o.id === 'id')?.show).toBe(true);
  });

  it("handleCheck properly casts 'indeterminate' to boolean", () => {
    const { result } = renderHook(() => useColumnVisibility());
    act(() => {
      // Passing 'indeterminate' updates show as true per cast in implementation
      result.current.handleCheck({ value: 'indeterminate', id: 'role' });

      expect(result.current.options.find(o => o.id === 'role')?.show).toBe(
        true,
      );
    });
  });
});
