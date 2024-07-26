import { useState, useEffect } from 'react';
import { BiTheme } from './useSettingsStore';

/**
 * Custom hook to detect and respond to the system's color scheme preference.
 * 
 * @returns {BiTheme} The current system theme, either BiTheme.DARK or BiTheme.LIGHT.
 */
function useSystemTheme() {
  // State to store the current theme, defaulting to DARK.
  const [biTheme, setBiTheme] = useState(BiTheme.DARK);

  useEffect(() => {
    // Create a MediaQueryList object to check the color scheme preference.
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set the initial theme based on the current media query state.
    if (mediaQuery.matches) {
      setBiTheme(BiTheme.DARK);
    } else {
      setBiTheme(BiTheme.LIGHT);
    }

    /**
     * Event handler to update the theme when the media query state changes.
     * 
     * @param {MediaQueryListEvent} event - The event triggered by the media query change.
     */
    const handleChange = (event: MediaQueryListEvent) => {
      setBiTheme(event.matches ? BiTheme.DARK : BiTheme.LIGHT);
    };

    // Add an event listener to respond to changes in the media query.
    mediaQuery.addListener(handleChange);

    // Clean up the event listener when the component unmounts.
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Return the current theme.
  return biTheme;
}

export default useSystemTheme;
