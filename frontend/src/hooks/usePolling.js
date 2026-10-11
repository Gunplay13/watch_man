// usePolling — re-runs a fetch function every `interval` ms.
// This is what gives the dashboard its real-time feel without websockets.
import { useEffect } from 'react';

export default function usePolling(fetchFn, interval = 10000) {
  useEffect(() => {
    fetchFn();
    const id = setInterval(fetchFn, interval);
    return () => clearInterval(id);
  }, [fetchFn, interval]);
}
