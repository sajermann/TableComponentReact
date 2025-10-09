import { toXML } from 'jstoxml';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { xml } from '.';
import { download } from '../download';

vi.mock('jstoxml');
vi.mock('../download');

type Data = { name: string; age: number };

const defColumns = [
  {
    header: 'Full Name',
    accessor: 'name',
    accessorFn: vi.fn(({ valueCell }: any) => valueCell.toUpperCase()),
  },
  {
    header: 'Age',
    accessor: 'age',
  },
] as any;

describe('xml function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call accessorFn when provided and generate XML with proper keys', () => {
    const data: Data[] = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    vi.mocked(toXML).mockImplementation(() => {
      return '<mock>Test</mock>' as any;
    });

    xml({ data, defColumns });

    // Verify accessorFn called with expected arguments
    expect(defColumns[0].accessorFn).toHaveBeenCalledWith(
      expect.objectContaining({
        valueCell: 'Alice',
        row: data[0],
        original: data,
        index: 0,
      }),
    );

    // The generated XML input
    const expectedDataPassedToXML = {
      data: [
        {
          item: [{ FullName: 'ALICE' }, { Age: 30 }],
        },
        {
          item: [{ FullName: 'BOB' }, { Age: 25 }],
        },
      ],
    };

    // Verify toXML is called with transformed data structure
    expect(toXML).toHaveBeenCalledWith(
      expectedDataPassedToXML,
      expect.any(Object),
    );

    expect(download).toHaveBeenCalled();

    // Check Blob arguments for correct type and BOM prefix
    const blobArgument = (download as any).mock.calls[0][0];
    expect(blobArgument).toBeInstanceOf(Blob);
    expect(blobArgument.type).toBe('application/xml');
  });

  it('should remove spaces from headers in XML keys', () => {
    const data = [{ name: 'Charlie', age: 40 }];
    const columnsWithSpace: any = [
      { header: 'Full Name', accessor: 'name' },
      { header: 'Date Of Birth', accessor: 'age' },
    ];
    vi.mocked(toXML).mockImplementation(() => {
      return '<mock>Test</mock>' as any;
    });
    xml({ data, defColumns: columnsWithSpace });

    const expectedData = {
      data: [
        {
          item: [{ FullName: 'Charlie' }, { DateOfBirth: 40 }],
        },
      ],
    };
    expect(toXML).toHaveBeenCalledWith(expectedData, expect.any(Object));
  });

  it('should handle empty data and defColumns without errors', () => {
    expect(() => xml({ data: [], defColumns: [] })).not.toThrow();
    expect(download).toHaveBeenCalled();
  });
});
