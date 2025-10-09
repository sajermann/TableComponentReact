export function download(blob: Blob | string, extension: string) {
  const link = document.createElement('a');
  link.href = typeof blob === 'string' ? blob : URL.createObjectURL(blob);
  link.download = `Data-${new Date().toISOString()}.${extension}`;
  link.click();
  URL.revokeObjectURL(link.href);
}
