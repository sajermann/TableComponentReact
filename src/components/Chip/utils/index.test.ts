import { describe, expect, it, vi } from 'vitest';
import { chipUtils } from '.';

describe('components/Chip/utils/save', () => {
  it('should call onChange with old and new value and setEditing to false', () => {
    const onChange = vi.fn();
    const setEditing = vi.fn();
    chipUtils.save({
      onChange,
      setEditing,
      value: 'old',
      valueEditing: 'new',
    });
    expect(onChange).toHaveBeenCalledWith('old', 'new');
    expect(setEditing).toHaveBeenCalledWith(false);
  });

  it('should not throw or call anything if onChange is not provided', () => {
    const setEditing = vi.fn();
    expect(() =>
      chipUtils.save({
        setEditing,
        value: 'antigo',
        valueEditing: 'novo',
      }),
    ).not.toThrow();
    expect(setEditing).not.toHaveBeenCalled();
  });
});

describe('components/Chip/utils/change', () => {
  it('should update value to given input value', () => {
    const setValueEditing = vi.fn();
    const fakeEvent = { target: { value: 'Hello' } } as any;
    chipUtils.change({ event: fakeEvent, setValueEditing });
    expect(setValueEditing).toHaveBeenCalledWith('Hello');
  });

  it('should ignore input if value is comma', () => {
    const setValueEditing = vi.fn();
    const fakeEvent = { target: { value: ',' } } as any;
    chipUtils.change({ event: fakeEvent, setValueEditing });
    expect(setValueEditing).not.toHaveBeenCalled();
  });
});

describe('components/Chip/utils/keyDownInput', () => {
  // it('should call save and preventDefault if key is in allowed keys', () => {
  //   const saveSpy = vi.spyOn(chipUtils, 'save');
  //   const preventDefault = vi.fn();
  //   const event = { key: 'Enter', preventDefault } as any;
  //   const setEditing = vi.fn();
  //   const onChange = vi.fn();
  //   chipUtils.keyDownInput({
  //     event,
  //     value: 'original',
  //     valueEditing: 'edit',
  //     setEditing,
  //     onChange,
  //   });
  //   expect(preventDefault).toHaveBeenCalled();
  //   expect(saveSpy).toHaveBeenCalledWith({
  //     value: 'original',
  //     valueEditing: 'edit',
  //     setEditing,
  //     onChange,
  //   });
  // });

  it('should do nothing if key is not in allowed keys', () => {
    const saveSpy = vi.spyOn(chipUtils, 'save');
    const preventDefault = vi.fn();
    const event = { key: 'A', preventDefault } as any;
    const setEditing = vi.fn();
    chipUtils.keyDownInput({
      event,
      value: 'original',
      valueEditing: 'edit',
      setEditing,
    });
    expect(preventDefault).not.toHaveBeenCalled();
    expect(saveSpy).not.toHaveBeenCalled();
  });
});
