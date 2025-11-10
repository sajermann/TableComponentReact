import { act, renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInput } from './';

describe('packages/TableMega/components/Input/hooks', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  // Helper function to create mock change events
  const createMockEvent = (value: string): ChangeEvent<HTMLInputElement> =>
    ({
      target: { value } as HTMLInputElement,
      currentTarget: { value } as HTMLInputElement,
    }) as ChangeEvent<HTMLInputElement>;

  describe('without debounce', () => {
    it('should initialize with undefined event', () => {
      const { result } = renderHook(() => useInput({}));

      expect(result.current.event).toBeUndefined();
    });

    it('should call onChange immediately when debounce is not provided', () => {
      const mockOnChange = vi.fn();
      const { result } = renderHook(() => useInput({ onChange: mockOnChange }));

      const mockEvent = createMockEvent('test value');

      act(() => {
        result.current.onChangeInternal(mockEvent);
      });

      expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('with debounce', () => {
    it('should not call onChange immediately when debounce is provided', () => {
      const mockOnChange = vi.fn();
      const { result } = renderHook(() =>
        useInput({ debounce: 500, onChange: mockOnChange }),
      );

      const mockEvent = createMockEvent('test value');

      act(() => {
        result.current.onChangeInternal(mockEvent);
      });

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should call onChange after debounce time has passed', () => {
      const mockOnChange = vi.fn();
      const debounceTime = 500;

      const { result } = renderHook(() =>
        useInput({ debounce: debounceTime, onChange: mockOnChange }),
      );

      const mockEvent = createMockEvent('test value');

      act(() => {
        result.current.onChangeInternal(mockEvent);
      });

      expect(mockOnChange).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(debounceTime);
      });

      expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('should update event state when debounce is provided', () => {
      const mockOnChange = vi.fn();
      const { result } = renderHook(() =>
        useInput({ debounce: 500, onChange: mockOnChange }),
      );

      const mockEvent = createMockEvent('test value');

      act(() => {
        result.current.onChangeInternal(mockEvent);
      });

      expect(result.current.event).toBe(mockEvent);
    });

    it('should debounce multiple rapid changes and only call onChange once', () => {
      const mockOnChange = vi.fn();
      const debounceTime = 500;

      const { result } = renderHook(() =>
        useInput({ debounce: debounceTime, onChange: mockOnChange }),
      );

      const mockEvent1 = createMockEvent('first');
      const mockEvent2 = createMockEvent('second');
      const mockEvent3 = createMockEvent('third');

      act(() => {
        result.current.onChangeInternal(mockEvent1);
      });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      act(() => {
        result.current.onChangeInternal(mockEvent2);
      });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      act(() => {
        result.current.onChangeInternal(mockEvent3);
      });

      act(() => {
        vi.advanceTimersByTime(debounceTime);
      });

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(mockEvent3);
    });

    it('should cleanup timer on unmount', () => {
      const mockOnChange = vi.fn();
      const debounceTime = 500;

      const { result, unmount } = renderHook(() =>
        useInput({ debounce: debounceTime, onChange: mockOnChange }),
      );

      const mockEvent = createMockEvent('test');

      act(() => {
        result.current.onChangeInternal(mockEvent);
      });

      unmount();

      act(() => {
        vi.advanceTimersByTime(debounceTime);
      });

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('setEvent functionality', () => {
    it('should expose setEvent method', () => {
      const { result } = renderHook(() => useInput({}));

      expect(result.current.setEvent).toBeDefined();
      expect(typeof result.current.setEvent).toBe('function');
    });

    it('should allow manual event updates via setEvent', () => {
      const mockOnChange = vi.fn();
      const debounceTime = 500;

      const { result } = renderHook(() =>
        useInput({ debounce: debounceTime, onChange: mockOnChange }),
      );

      const mockEvent = createMockEvent('manual update');

      act(() => {
        result.current.setEvent(mockEvent);
      });

      expect(result.current.event).toBe(mockEvent);

      act(() => {
        vi.advanceTimersByTime(debounceTime);
      });

      expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
    });
  });
});
