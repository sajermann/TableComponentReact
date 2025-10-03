import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TPerson } from '~/types';
import { getFormattedValues, handleFormSubmit } from '.';

describe('pages/TableMega/FullEditable/utils/getFormattedValues', () => {
  it('returns entries matching given prop with parsed row and value', () => {
    const data = {
      'name-0': 'Alice',
      'name-1': 'Bob',
      'lastName-0': 'Smith',
      'other-0': 'Unrelated',
      'name-xyz': 'Ignored',
    };

    const result = getFormattedValues(data, 'name');
    expect(result).toEqual([
      { row: 0, value: 'Alice' },
      { row: 1, value: 'Bob' },
      { row: NaN, value: 'Ignored' },
    ]);
  });

  it('returns empty array if no keys match', () => {
    const data = {
      'foo-0': 'x',
      'bar-1': 'y',
    };
    expect(getFormattedValues(data, 'name')).toEqual([]);
  });
});

describe('pages/TableMega/FullEditable/utils/handleFormSubmit', () => {
  it('processes form data and updates state correctly', () => {
    const prevData: Partial<TPerson>[] = [
      { name: '', lastName: '', birthday: '', role: 'User', isActive: false },
      { name: '', lastName: '', birthday: '', role: 'User', isActive: false },
    ];

    // FormData mock entries simulating form submission
    const formEntries = [
      ['name-0', 'Alice'],
      ['lastName-0', 'Smith'],
      ['birthday-0', '1990-01-01'],
      ['role-0', 'Admin'],
      ['isActive-0', 'on'],
      ['name-1', 'Bob'],
      ['lastName-1', 'Jones'],
      ['birthday-1', '1985-12-12'],
      ['role-1', 'User'],
      // isActive missing for row 1, defaults to false
    ];

    // Mock FormData class
    const mockFormData = {
      entries: () => formEntries,
    };

    const mockEvent = {
      preventDefault: vi.fn(),
      currentTarget: {},
    } as unknown as React.FormEvent<HTMLFormElement>;

    // Patch global FormData temporarily for this test
    const OriginalFormData = global.FormData;
    global.FormData = class {
      constructor() {
        return mockFormData;
      }
    } as unknown as typeof FormData;

    const setData = vi.fn(updater => {
      const result = updater(prevData);
      return result;
    });

    handleFormSubmit({ event: mockEvent, setData });

    expect(mockEvent.preventDefault).toHaveBeenCalled();

    expect(setData).toHaveBeenCalled();

    // Call the updater function passed to setData and inspect output
    const updated = setData.mock.calls[0][0](prevData);

    expect(updated[0]).toEqual({
      name: 'Alice',
      lastName: 'Smith',
      birthday: '1990-01-01',
      role: 'Admin',
      isActive: true,
    });

    expect(updated[1]).toEqual({
      name: 'Bob',
      lastName: 'Jones',
      birthday: '1985-12-12',
      role: 'User',
      isActive: false,
    });

    // Restore original FormData
    global.FormData = OriginalFormData;
  });

  it('handles missing event gracefully', () => {
    const setData = vi.fn();
    // Should not throw even when event is undefined
    expect(() => handleFormSubmit({ setData })).not.toThrow();
    expect(setData).toHaveBeenCalled();
  });
});
