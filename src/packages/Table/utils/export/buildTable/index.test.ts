import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TCellProps, TDefPrintPdfPng } from '~/packages/Table/types';
import { buildTable } from '.';
import { addRows as addRowsToMock } from '../addRows';

// Mock do addRows para facilitar controle dos dados durante o teste
vi.mock('../addRows', () => ({
  addRows: vi.fn(),
}));

// Tipos auxiliares simples
type Data = { name: string; age: number };

// Suporte para alinhar Typescript com o que a função espera
const makeDefColumns = (
  cellRender?: (props: TCellProps<Data>) => string,
): TDefPrintPdfPng<Data>[] => [
  {
    header: 'Nome',
    align: 'left',
    accessor: 'name',
    cellRender,
  },
  {
    header: 'Idade',
    align: 'right',
    accessor: 'age',
    cellRender,
  },
];

const mockData: Data[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];

describe('packages/Table/utils/export/buildTable', () => {
  beforeEach(() => {
    // Limpa mocks antes de cada teste
    vi.clearAllMocks();
  });

  it('must create header', () => {
    vi.mocked(addRowsToMock).mockReturnValue([
      [
        { value: 'Alice', align: 'left' },
        { value: 30, align: 'right' },
      ],
      [
        { value: 'Bob', align: 'left' },
        { value: 25, align: 'right' },
      ],
    ]);

    const table = buildTable({ data: mockData, defColumns: makeDefColumns() });
    const thead = table.querySelector('thead');
    expect(thead).toBeTruthy();

    const ths = thead?.querySelectorAll('th');
    expect(ths?.length).toBe(2);
    expect(ths?.[0].textContent).toBe('Nome');
    expect(ths?.[1].textContent).toBe('Idade');
    expect(ths?.[0].style.textAlign).toBe('left');
    expect(ths?.[1].style.textAlign).toBe('right');
  });

  it('must create rows of body', () => {
    vi.mocked(addRowsToMock).mockReturnValue([
      [
        { value: 'Alice', align: 'left' },
        { value: 30, align: 'right' },
      ],
      [
        { value: 'Bob', align: 'left' },
        { value: 25, align: 'right' },
      ],
    ]);

    const table = buildTable({ data: mockData, defColumns: makeDefColumns() });

    const tbody = table.querySelector('tbody');
    expect(tbody).toBeTruthy();

    const trs = tbody?.querySelectorAll('tr');
    expect(trs?.length).toBe(2);

    const cells = trs?.[0].querySelectorAll('td');
    expect(cells?.[0].textContent).toBe('Alice');
    expect(cells?.[1].textContent).toBe('30');

    const cells2 = trs?.[1].querySelectorAll('td');
    expect(cells2?.[0].textContent).toBe('Bob');
    expect(cells2?.[1].textContent).toBe('25');
  });

  it('must call cellRender', () => {
    const cellRender = vi.fn(({ valueCell }) => `<b>${valueCell}</b>`);
    vi.mocked(addRowsToMock).mockReturnValue([
      [
        { value: 'Alice', align: 'left', cellRender },
        { value: 30, align: 'right', cellRender },
      ],
    ]);

    const table = buildTable({
      data: [mockData[0]],
      defColumns: makeDefColumns(cellRender),
    });
    const html = table.outerHTML;

    expect(html).toContain('<b>Alice</b>');
    expect(html).toContain('<b>30</b>');
    expect(cellRender).toHaveBeenCalledTimes(2);
  });

  it('must set attributes border and color in table', () => {
    vi.mocked(addRowsToMock).mockReturnValue([]);
    const table = buildTable({ data: [], defColumns: makeDefColumns() });
    expect(table.getAttribute('style')).toContain('border-collapse');
    expect(table.getAttribute('style')).toContain('color: black');
  });

  it('must return table html always', () => {
    vi.mocked(addRowsToMock).mockReturnValue([]);
    const table = buildTable({ data: [], defColumns: makeDefColumns() });
    expect(table.tagName).toBe('TABLE');
  });
});
