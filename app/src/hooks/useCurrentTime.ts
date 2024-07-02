import { useState, useEffect } from 'react';

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    // Calculate delay until next minute
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Update time every minute
    const intervalId = setTimeout(() => {
      updateTime();
      setInterval(updateTime, 60000);
    }, delay);

    // Cleanup timeout on unmount
    return () => clearTimeout(intervalId);
  }, []);

  return currentTime;
};

export default useCurrentTime;