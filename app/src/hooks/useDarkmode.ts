import { useState, useEffect } from 'react';

function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // Immediately set dark mode based on the media query
    setIsDarkMode(mediaQuery.matches);

    // Define a function to handle changes in the media query
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };
    mediaQuery.addListener(handleChange);

    // Clean up the event listener when the component unmounts
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return isDarkMode;
}

export default useDarkMode;