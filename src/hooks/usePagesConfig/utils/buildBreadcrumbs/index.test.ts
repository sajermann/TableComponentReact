import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buildBreadcrumbs } from '.';

describe('hook/usePagesConfig/utils/buildBreadcrumbs', () => {
  const setBreadcrumbs = vi.fn();
  const translate = vi.fn((label: string) => `translated-${label}`) as any;

  beforeEach(() => {
    setBreadcrumbs.mockClear();
    translate.mockClear();
    document.title = '';
  });

  it('should clear breadcrumbs and set document title if matchs length less than 3', () => {
    const matchs = [
      { staticData: { routerName: 'Home' }, pathname: '/' },
      { staticData: { routerName: 'About' }, pathname: '/about' },
    ];

    buildBreadcrumbs({ matchs, setBreadcrumbs, translate });

    expect(setBreadcrumbs).toHaveBeenCalledWith([]);
    expect(document.title).toBe(import.meta.env.VITE_APPLICATION_NAME);
  });

  it('should build breadcrumbs and update document title correctly', () => {
    const matchs = [
      { staticData: { routerName: 'Home' }, pathname: '/' },
      { staticData: { routerName: 'About' }, pathname: '/about' },
      { staticData: { routerName: 'Contact' }, pathname: '/contact' },
    ];

    buildBreadcrumbs({ matchs, setBreadcrumbs, translate });

    expect(setBreadcrumbs).toHaveBeenCalledWith([
      { label: 'HOME', link: '/' },
      { label: 'About', link: '/about' },
      { label: 'Contact', link: '/contact' },
    ]);

    expect(document.title).toBe(
      `translated-Contact | ${import.meta.env.VITE_APPLICATION_NAME}`,
    );
  });

  it('should skip routes without routerName label', () => {
    const matchs = [
      { staticData: { routerName: 'Home' }, pathname: '/' },
      { staticData: {}, pathname: '/missing' },
      { staticData: { routerName: 'Contact' }, pathname: '/contact' },
      { staticData: null, pathname: '/null' },
    ];

    buildBreadcrumbs({ matchs, setBreadcrumbs, translate });

    expect(setBreadcrumbs).toHaveBeenCalledWith([
      { label: 'HOME', link: '/' },
      { label: 'Contact', link: '/contact' },
    ]);

    expect(document.title).toBe(
      `translated-Contact | ${import.meta.env.VITE_APPLICATION_NAME}`,
    );
  });
});
