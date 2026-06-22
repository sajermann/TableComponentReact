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
    const routes = [
      {
        _fullPath: '/a-prev',
        fullPath: '/a-prev',
        rank: 1,
        options: { staticData: { routerName: 'Prev Page' } },
      },
      {
        _fullPath: '/b-current',
        fullPath: '/b-current',
        rank: 2,
        options: { staticData: { routerName: 'Current Page' } },
      },
      {
        _fullPath: '/c-next',
        fullPath: '/c-next',
        rank: 3,
        options: { staticData: { routerName: 'Next Page' } },
      },
    ];

    buildOtherComponents({ routes, pathname: '/b-current', setOtherComponents });

    expect(setOtherComponents).toHaveBeenCalledWith({
      prev: { label: 'Prev Page', path: '/a-prev' },
      next: { label: 'Next Page', path: '/c-next' },
    });
  });

  it('next/prev must be null if not routerName exists', () => {
    
    const routes = [
      {
        _fullPath: '/a-prev',
        fullPath: '/a-prev',
        rank: 1,
        options: { staticData: {} },
      },
      {
        _fullPath: '/b-current',
        fullPath: '/b-current',
        rank: 2,
        options: { staticData: { routerName: 'Current Page' } },
      },
      {
        _fullPath: '/c-next',
        fullPath: '/c-next',
        rank: 3,
        options: { staticData: {} },
      },
    ];

    buildOtherComponents({ routes, pathname: null as unknown as string, setOtherComponents });

    expect(setOtherComponents).toHaveBeenCalledWith({
      prev: null,
      next: null,
    });
  });

});
