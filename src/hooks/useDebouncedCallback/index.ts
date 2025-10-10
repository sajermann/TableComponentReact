import { useCallback, useEffect, useRef } from 'react';

export function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const latestCallback = useRef(callback);
  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        latestCallback.current(...args);
      }, delay);
    },
    [delay],
  );

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return debouncedFunction;
}
