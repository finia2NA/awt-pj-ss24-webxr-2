import { useState, useEffect } from 'react';

/**
 * Custom React hook that provides the current time in "HH:MM" format.
 * The time is updated every minute.
 *
 * @returns {string} The current time in "HH:MM" format.
 */
const useCurrentTime = () => {
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    /**
     * Function to update the current time state with the current hour and minute.
     */
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    // Initial update to set the current time
    updateTime();

    // Calculate delay until the start of the next minute
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Set a timeout to update the time at the start of the next minute,
    // and then set an interval to update the time every minute thereafter
    const intervalId = setTimeout(() => {
      updateTime();
      setInterval(updateTime, 60000);
    }, delay);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(intervalId);
  }, []);

  return currentTime;
};

export default useCurrentTime;
