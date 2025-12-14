import { useState, useEffect } from 'react';

export const useTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const syncClock = () => {
      const now = new Date();
      setTime(now);

      // Calculate delay until the start of the next second (1000ms - current milliseconds)
      // This ensures the clock updates exactly when the system second changes,
      // preventing drift that occurs with simple setInterval.
      const delay = 1000 - now.getMilliseconds();
      
      timeoutId = setTimeout(syncClock, delay);
    };

    syncClock();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return time;
};