/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest';
import { preOnChange } from '.';
import { onChangeCustom } from '../onChangeCustom';

vi.mock('../onChangeCustom');

describe('components/Input/utils/preOnchange', () => {
  it(`must call onChangeCustom when debouce is falsy`, async () => {
    const spySetEvent = vi.fn();
    const spyOnChange = vi.fn();
    const spyOnChangeCustom = vi.fn();
    vi.mocked(onChangeCustom).mockImplementation(spyOnChangeCustom);
    await preOnChange({
      e: {} as any,
      onChange: spyOnChange,
      debounce: 0,
      setEvent: spySetEvent,
    });

    expect(spyOnChangeCustom).toBeCalled();
    expect(spySetEvent).not.toBeCalled();
  });

  it(`must call setEvent when debouce is truth`, async () => {
    const spySetEvent = vi.fn();
    const spyOnChange = vi.fn();
    const spyOnChangeCustom = vi.fn();
    vi.mocked(onChangeCustom).mockImplementation(spyOnChangeCustom);
    await preOnChange({
      e: {} as any,
      onChange: spyOnChange,
      debounce: 1,
      setEvent: spySetEvent,
    });

    expect(spyOnChangeCustom).not.toBeCalled();
    expect(spySetEvent).toBeCalled();
  });
});
