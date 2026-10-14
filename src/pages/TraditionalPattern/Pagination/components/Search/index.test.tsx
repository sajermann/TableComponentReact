import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Search } from '.';

vi.mock(import('~/hooks'), async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      translate: ((key: string) => key) as any,
      changeLanguage: vi.fn(),
      currentLanguage: 'en',
    }),
  };
});

describe('pages/TraditionalPattern/Pagination/components/Search', () => {
  it('should type in name, select isActive, and click filter', () => {
    const setFilterParams = vi.fn();
    render(<Search filterParams="" setFilterParams={setFilterParams} />);

    const nameInput = screen.getByLabelText('NAME');
    fireEvent.change(nameInput, { target: { value: 'John' } });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { id: 'isActive', value: 'yes' } });

    const filterButton = screen.getByText('FILTER');
    fireEvent.click(filterButton);

    expect(setFilterParams).toHaveBeenCalledWith('name=John&isActive=yes');
  });

  it('should clear filters when clear button is clicked', () => {
    const setFilterParams = vi.fn();
    render(
      <Search filterParams="?name=John" setFilterParams={setFilterParams} />,
    );

    const clearButton = screen.getByText('CLEAR');
    expect(clearButton).not.toBeDisabled();

    fireEvent.click(clearButton);
    expect(setFilterParams).toHaveBeenCalledWith('');
  });
});
