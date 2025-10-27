import { beforeEach, describe, expect, it, vi } from 'vitest';
import { onResizing } from '.';

const DEFAULT = {
  id: 100,
  avatar: 60,
  name: 100,
  lastName: 100,
  birthday: 100,
  email: 100,
  role: 100,
  isActive: 100,
  friends: 100,
};

describe('pages/TableMega/Resizing/components/Resizing/utils', () => {
  let storage: Record<string, string>;
  vi.mock('~/utils/getEnv', () => ({
    getEnv: () => 'table-test',
  }));

  beforeEach(() => {
    storage = {};

    // mock localStorage
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => {
        storage[key] = value;
      },
    });

    // mock import.meta.env (o importante é definir globalThis.importMeta)
    Object.defineProperty(globalThis, 'importMeta', {
      value: {
        env: { VITE_APPLICATION_IDENTIFIER: 'MYAPP' },
      },
      configurable: true,
    });
  });

  it('save columns in localStorage when initial', () => {
    onResizing({ columnSizing: { id: 120, name: 200 } });
    const saved = JSON.parse(storage[`table-test:resizing`]);
    expect(saved.id).toBe(120);
    expect(saved.name).toBe(200);
    expect(saved.email).toBe(100);
  });

  it('update column in localStorage when exists', () => {
    storage['table-test:resizing'] = JSON.stringify({ ...DEFAULT, id: 105 });
    onResizing({ columnSizing: { id: 130 } });

    const saved = JSON.parse(storage['table-test:resizing']);
    expect(saved.id).toBe(130);
    expect(saved.email).toBe(100);
  });

  it('dont save if no exists key', () => {
    onResizing({ columnSizing: {} });
    expect(storage['MYAPP:resizing']).toBeUndefined();
  });
});
