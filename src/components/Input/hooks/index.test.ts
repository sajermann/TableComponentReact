import { act, renderHook, waitFor } from "@testing-library/react";
import { ChangeEvent } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useInput } from "./";

describe("components/Input/hooks", () => {
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

  describe("without debounce", () => {
    it("should initialize with undefined event", () => {
      const { result } = renderHook(() => useInput({}));

      expect(result.current.event).toBeUndefined();
    });

    it("should call onChange immediately when debounce is not provided", () => {
      const mockOnChange = vi.fn();
      const { result } = renderHook(() => useInput({ onChange: mockOnChange }));

      const mockEvent = createMockEvent("test value");

      act(() => {
        result.current.onChangeInternal(mockEvent);
      });

      expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    // it("should call onBeforeChange before onChange", () => {
    //   const callOrder: string[] = [];
    //   const mockOnBeforeChange = vi.fn(() => {
    //     callOrder.push("before");
    //     return true;
    //   });
    //   const mockOnChange = vi.fn(() => {
    //     callOrder.push("after");
    //   });

    //   const { result } = renderHook(() =>
    //     useInput({
    //       onBeforeChange: mockOnBeforeChange,
    //       onChange: mockOnChange,
    //     })
    //   );

    //   const mockEvent = createMockEvent("test");

    //   act(() => {
    //     result.current.onChangeInternal(mockEvent);
    //   });

    //   expect(mockOnBeforeChange).toHaveBeenCalledWith(mockEvent);
    //   expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
    //   expect(callOrder).toEqual(["before", "after"]);
    // });

    // it("should not call onChange if onBeforeChange returns false", () => {
    //   const mockOnBeforeChange = vi.fn(() => false);
    //   const mockOnChange = vi.fn();

    //   const { result } = renderHook(() =>
    //     useInput({
    //       onBeforeChange: mockOnBeforeChange,
    //       onChange: mockOnChange,
    //     })
    //   );

    //   const mockEvent = createMockEvent("test");

    //   act(() => {
    //     result.current.onChangeInternal(mockEvent);
    //   });

    //   expect(mockOnBeforeChange).toHaveBeenCalledWith(mockEvent);
    //   expect(mockOnChange).not.toHaveBeenCalled();
    // });
  });

  describe("with debounce", () => {
    it("should not call onChange immediately when debounce is provided", () => {
      const mockOnChange = vi.fn();
      const { result } = renderHook(() =>
        useInput({ debounce: 500, onChange: mockOnChange })
      );

      const mockEvent = createMockEvent("test value");

      act(() => {
        result.current.onChangeInternal(mockEvent);
      });

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("should call onChange after debounce time has passed", () => {
      const mockOnChange = vi.fn();
      const debounceTime = 500;

      const { result } = renderHook(() =>
        useInput({ debounce: debounceTime, onChange: mockOnChange })
      );

      const mockEvent = createMockEvent("test value");

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

    it("should update event state when debounce is provided", () => {
      const mockOnChange = vi.fn();
      const { result } = renderHook(() =>
        useInput({ debounce: 500, onChange: mockOnChange })
      );

      const mockEvent = createMockEvent("test value");

      act(() => {
        result.current.onChangeInternal(mockEvent);
      });

      expect(result.current.event).toBe(mockEvent);
    });

    it("should debounce multiple rapid changes and only call onChange once", () => {
      const mockOnChange = vi.fn();
      const debounceTime = 500;

      const { result } = renderHook(() =>
        useInput({ debounce: debounceTime, onChange: mockOnChange })
      );

      const mockEvent1 = createMockEvent("first");
      const mockEvent2 = createMockEvent("second");
      const mockEvent3 = createMockEvent("third");

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

    // it("should call onBeforeChange with debounce after timeout", () => {
    //   const mockOnBeforeChange = vi.fn(() => true);
    //   const mockOnChange = vi.fn();
    //   const debounceTime = 500;

    //   const { result } = renderHook(() =>
    //     useInput({
    //       debounce: debounceTime,
    //       onBeforeChange: mockOnBeforeChange,
    //       onChange: mockOnChange,
    //     })
    //   );

    //   const mockEvent = createMockEvent("test");

    //   act(() => {
    //     result.current.onChangeInternal(mockEvent);
    //   });

    //   expect(mockOnBeforeChange).not.toHaveBeenCalled();

    //   act(() => {
    //     vi.advanceTimersByTime(debounceTime);
    //   });

    //   expect(mockOnBeforeChange).toHaveBeenCalledWith(mockEvent);
    //   expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
    // });

    // it("should not call onChange if onBeforeChange returns false with debounce", () => {
    //   const mockOnBeforeChange = vi.fn(() => false);
    //   const mockOnChange = vi.fn();
    //   const debounceTime = 500;

    //   const { result } = renderHook(() =>
    //     useInput({
    //       debounce: debounceTime,
    //       onBeforeChange: mockOnBeforeChange,
    //       onChange: mockOnChange,
    //     })
    //   );

    //   const mockEvent = createMockEvent("test");

    //   act(() => {
    //     result.current.onChangeInternal(mockEvent);
    //   });

    //   act(() => {
    //     vi.advanceTimersByTime(debounceTime);
    //   });

    //   expect(mockOnBeforeChange).toHaveBeenCalledWith(mockEvent);
    //   expect(mockOnChange).not.toHaveBeenCalled();
    // });

    it("should cleanup timer on unmount", () => {
      const mockOnChange = vi.fn();
      const debounceTime = 500;

      const { result, unmount } = renderHook(() =>
        useInput({ debounce: debounceTime, onChange: mockOnChange })
      );

      const mockEvent = createMockEvent("test");

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

  describe("setEvent functionality", () => {
    it("should expose setEvent method", () => {
      const { result } = renderHook(() => useInput({}));

      expect(result.current.setEvent).toBeDefined();
      expect(typeof result.current.setEvent).toBe("function");
    });

    it("should allow manual event updates via setEvent", () => {
      const mockOnChange = vi.fn();
      const debounceTime = 500;

      const { result } = renderHook(() =>
        useInput({ debounce: debounceTime, onChange: mockOnChange })
      );

      const mockEvent = createMockEvent("manual update");

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
