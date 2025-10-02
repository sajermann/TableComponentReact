import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLocation, useMatches, useRouter } from '@tanstack/react-router';

import { buildOtherComponents } from '.';

describe('hook/usePagesConfig/utils/buildOtherComponents', () => {
  const setOtherComponents = vi.fn();

  beforeEach(() => {
    setOtherComponents.mockClear();
    // Simula location.pathname para o teste
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/current',
      },
      writable: true,
    });
  });

  it('must define next and prev correctly', () => {
    const flatRoutes = [
      {
        _fullPath: '/prev',
        rank: 1,
        options: { staticData: { routerName: 'Prev Page' } },
      },
      {
        _fullPath: '/current',
        rank: 2,
        options: { staticData: { routerName: 'Current Page' } },
      },
      {
        _fullPath: '/next',
        rank: 3,
        options: { staticData: { routerName: 'Next Page' } },
      },
    ];

    buildOtherComponents({ flatRoutes, setOtherComponents });

    expect(setOtherComponents).toHaveBeenCalledWith({
      prev: { label: 'Prev Page', path: '/prev' },
      next: { label: 'Next Page', path: '/next' },
    });
  });

  it('next/prev must be null if not routerName exists', () => {
    const flatRoutes = [
      {
        _fullPath: '/prev',
        rank: 1,
        options: { staticData: {} },
      },
      {
        _fullPath: '/current',
        rank: 2,
        options: { staticData: { routerName: 'Current Page' } },
      },
      {
        _fullPath: '/next',
        rank: 3,
        options: { staticData: {} },
      },
    ];

    buildOtherComponents({ flatRoutes, setOtherComponents });

    expect(setOtherComponents).toHaveBeenCalledWith({
      prev: null,
      next: null,
    });
  });

  it('next/prev must be null if not routerName to be undefined', () => {
    const flatRoutes = [
      {
        _fullPath: '/other',
        rank: 1,
        options: { staticData: { routerName: 'Other Page' } },
      },
    ];

    buildOtherComponents({ flatRoutes, setOtherComponents });

    expect(setOtherComponents).toHaveBeenCalledWith({
      prev: null,
      next: null,
    });
  });
});
