import { useEffect, useRef } from 'react';

interface UsePollingOptions<T> {
  fetchFunc: () => Promise<T>;
  interval: number; // ms
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  enabled?: boolean;
}

export function usePolling<T>({
  fetchFunc,
  interval,
  onSuccess,
  onError,
  enabled = true,
}: UsePollingOptions<T>) {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const poll = async () => {
      try {
        const data = await fetchFunc();
        onSuccess?.(data);
      } catch (error) {
        onError?.(error);
      }
    };

    poll();
    intervalRef.current = setInterval(poll, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchFunc, interval, onSuccess, onError, enabled]);
}