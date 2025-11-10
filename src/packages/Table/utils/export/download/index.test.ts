import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { download } from '.';

// Store real functions to restore after mocking
const originalCreateObjectURL = URL.createObjectURL;
const originalRevokeObjectURL = URL.revokeObjectURL;

type Any = any;

describe('packages/Table/utils/export/download', () => {
  let createElementSpy: Any;
  let clickMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Reset and mock methods
    createElementSpy = vi.spyOn(document, 'createElement');
    clickMock = vi.fn();
    // Mock anchor element with click
    createElementSpy.mockReturnValue({
      set href(val) {
        (this as Any)._href = val;
      },
      get href() {
        return (this as Any)._href;
      },
      set download(val) {
        (this as Any)._download = val;
      },
      get download() {
        return (this as Any)._download;
      },
      click: clickMock,
    } as unknown as HTMLAnchorElement);
    // Mock URL.createObjectURL and revokeObjectURL
    URL.createObjectURL = vi.fn(() => 'blob:url');
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    // Restore mocks and real functions
    createElementSpy.mockRestore();
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
  });

  it('creates an anchor element and sets download attributes', () => {
    const blob = new Blob(['test']);
    download(blob, 'txt');

    // Check anchor is created
    expect(createElementSpy).toHaveBeenCalledWith('a');

    // Check correct href (through createObjectURL) and download name
    const anchor = createElementSpy.mock.results[0].value;
    expect(anchor.href).toBe('blob:url');
    expect(anchor.download).toMatch(/^Data-\d{4}-\d{2}-\d{2}T/); // Starts with Data-ISO
    expect(anchor.download.endsWith('.txt')).toBe(true);
  });

  it('calls click on the anchor to trigger download', () => {
    const blob = new Blob(['data']);
    download(blob, 'csv');
    expect(clickMock).toHaveBeenCalled();
  });

  it('releases object URLs after download', () => {
    const blob = new Blob(['release']);
    download(blob, 'csv');
    // Ensure revokeObjectURL is called with the blob URL
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:url');
  });

  it('handles string URLs directly', () => {
    download('https://example.com/file.png', 'png');
    const anchor = createElementSpy.mock.results[0].value;
    expect(anchor.href).toBe('https://example.com/file.png');
    // Should revoke that URL as well, since the function does it
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(
      'https://example.com/file.png',
    );
  });
});
