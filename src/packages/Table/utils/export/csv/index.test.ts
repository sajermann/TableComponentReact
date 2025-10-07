import { beforeEach, describe, expect, it, vi } from 'vitest';
import { csv } from '.'; // ajuste o caminho conforme o seu projeto
import { TDefCsv } from '../../../types';

// Mock de XLSX
vi.mock('xlsx-js-style', () => ({
  utils: {
    json_to_sheet: vi.fn(() => 'ws-mock'),
    sheet_to_csv: vi.fn(() => 'colA;colB\n1;2\n3;4'),
  },
}));

// Mock da função de download
vi.mock('../download', () => ({
  download: vi.fn(),
}));

type Data = { a: number; b: number };

const defColumns: TDefCsv<Data>[] = [
  { header: 'colA', accessor: 'a' },
  { header: 'colB', accessor: 'b' },
];

describe('csv', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve gerar CSV padrão e chamar download', () => {
    const data: Data[] = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ];
    csv({ data, defColumns });

    // Verifica se XLSX foi chamado certo
    const XLSX = require('xlsx-js-style');
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([
      { colA: 1, colB: 2 },
      { colA: 3, colB: 4 },
    ]);

    // // Check sheet_to_csv
    // expect(XLSX.utils.sheet_to_csv).toHaveBeenCalledWith('ws-mock', {
    //   FS: ';',
    // });

    // // Verifica se download foi chamado
    // const { download } = require('../download');
    // expect(download).toHaveBeenCalled();

    // // Checa se blob e nome estão corretos
    // const blob = download.mock.calls[0][0];
    // expect(blob.type).toBe('application/csv');
    // expect(download.mock.calls[0][1]).toBe('csv');
  });

  // it('deve respeitar o delimitador customizado', () => {
  //   const data: Data[] = [{ a: 5, b: 6 }];
  //   csv({ data, defColumns, delimiter: ',' });
  //   const XLSX = require('xlsx-js-style');
  //   expect(XLSX.utils.sheet_to_csv).toHaveBeenCalledWith('ws-mock', {
  //     FS: ',',
  //   });
  // });

  // it('deve aplicar accessorFn se fornecido', () => {
  //   const accessorFn = vi.fn(({ valueCell }) => String(valueCell * 2));
  //   const customDef: TDefCsv<Data>[] = [
  //     { header: 'dobroA', accessor: 'a', accessorFn },
  //   ];
  //   const data: Data[] = [{ a: 7, b: 8 }];
  //   csv({ data, defColumns: customDef });

  //   expect(accessorFn).toHaveBeenCalledWith({
  //     original: data,
  //     row: data[0],
  //     valueCell: 7,
  //     index: 0,
  //   });

  //   const XLSX = require('xlsx-js-style');
  //   expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([{ dobroA: 14 }]);
  // });

  // it('deve deixar defColumns vazio sem erro', () => {
  //   const data: Data[] = [{ a: 1, b: 2 }];
  //   expect(() => csv({ data })).not.toThrow();
  //   const XLSX = require('xlsx-js-style');
  //   expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([{}]);
  // });

  // it('deve adicionar BOM ao blob', async () => {
  //   const data: Data[] = [{ a: 1, b: 2 }];
  //   csv({ data, defColumns });
  //   const { download } = require('../download');
  //   const blob = download.mock.calls[0][0];
  //   const arrayBuffer = await blob.arrayBuffer();
  //   const bom = new Uint8Array(arrayBuffer).slice(0, 3);
  //   expect(Array.from(bom)).toEqual([0xef, 0xbb, 0xbf]);
  // });
});
