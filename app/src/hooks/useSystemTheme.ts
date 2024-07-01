import { useState, useEffect } from 'react';
import { BiTheme } from './useSettingsStore';

function useSystemTheme() {
  const [biTheme, setBiTheme] = useState(BiTheme.DARK);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // Immediately set dark mode based on the media query

    if (mediaQuery.matches) {
      setBiTheme(BiTheme.DARK);
    } else {
      setBiTheme(BiTheme.LIGHT);
    }

    // Define a function to handle changes in the media query
    const handleChange = (event: MediaQueryListEvent) => {
      setBiTheme(event.matches ? BiTheme.DARK : BiTheme.LIGHT);
    };
    mediaQuery.addListener(handleChange);

    // Clean up the event listener when the component unmounts
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return biTheme;
}

export default useSystemTheme;