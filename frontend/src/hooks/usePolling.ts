// usePolling — re-runs a fetch function every `interval` ms.
// This is what gives the dashboard its real-time feel without websockets.
import { useEffect } from 'react';

export default function usePolling(
  fetchFn: () => void | Promise<void>,
  interval = 10000,
): void {
  useEffect(() => {
    fetchFn();
    const id = setInterval(fetchFn, interval);
    return () => clearInterval(id);
  }, [fetchFn, interval]);
}
