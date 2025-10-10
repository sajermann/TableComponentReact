import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useDebouncedCallback } from './';

// Simula timer para testes de debounce
vi.useFakeTimers();

describe('src/hooks/useDebouncedCallback', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });

  it('deve debounciar a função de callback', () => {
    const callback = vi.fn();

    // Renderiza o hook com delay de 500ms
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    // Chama a função debounced várias vezes rapidamente
    act(() => {
      result.current();
      result.current();
      result.current();
    });

    // Antes de avançar o timer, callback não deve ter sido chamado
    expect(callback).not.toHaveBeenCalled();

    // Avança o tempo dos timers em 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Agora o callback deve ter sido chamado exatamente 1 vez
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve passar argumentos corretamente para a função callback', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 300));

    act(() => {
      result.current('arg1', 123);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledWith('arg1', 123);
  });
});
