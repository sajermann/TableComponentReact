/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { useRoutesMenu } from '~/hooks/useRoutesMenu';
import { TRoutesMenu } from '~/types/TRoutesMenu';
import { OtherComponents } from '.';

describe('Components/Sidebar/OtherComponents', () => {
  vi.mock('~/hooks/useRoutesMenu');
  it(`should render prev and next`, async () => {
    const prev = {
      name: 'Home',
      path: '/',
      label: 'Home',
    } as TRoutesMenu;

    const current = {
      name: 'Button',
      path: '/button',
      label: 'Button',
    } as TRoutesMenu;

    const next = {
      name: 'Modal',
      path: '/modal',
      label: 'Modal',
    } as TRoutesMenu;

    vi.mocked(useRoutesMenu).mockImplementation(() => ({
      globalMenus: () => [],
      globalRoutes: [prev, current, next],
      triRoutes: {
        next,
        prev,
      },
    }));
    const { getByText } = render(
      <InjectorProviders>
        <OtherComponents />
      </InjectorProviders>,
    );

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Modal')).toBeTruthy();
  });

  it(`should render prev and next`, async () => {
    const prev = {
      name: 'Home',
      path: '/',
      label: 'Home',
    } as TRoutesMenu;

    vi.mocked(useRoutesMenu).mockImplementation(() => ({
      globalMenus: () => [],
      globalRoutes: [prev],
      triRoutes: {
        next: null,
        prev: null,
      },
    }));
    const { queryByText } = render(
      <InjectorProviders>
        <OtherComponents />
      </InjectorProviders>,
    );
    expect(queryByText('Home')).toBeFalsy();
  });
});
