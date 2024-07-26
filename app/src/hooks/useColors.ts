import { Color } from "three";
import useSettingsStore, { BiTheme, SettingsState } from "./useSettingsStore";

/**
 * Converts HSL color values to a THREE.js Color object.
 * @param {number} h - The hue component of the color (0-360).
 * @param {number} s - The saturation component of the color (0-100).
 * @param {number} l - The lightness component of the color (0-100).
 * @returns {Color} - A THREE.js Color object representing the HSL color.
 */
function hsl(h: number, s: number, l: number): Color {
  return new Color().setHSL(h / 360, s / 100, l / 100, 'srgb');
}

interface Colors {
  // Main colors
  primary: Color;
  secondary: Color;
  background: Color;
  hover: Color;
  backgroundOpacity: number;
  accent: Color;
  accentForeground: Color;

  scrollbar: Color;

  // Card colors
  cardBorder: Color;
  cardBackground: Color;
  cardBackgroundOpacity: number;
}

const darkColors: Colors = {
  primary: hsl(0, 0, 100),
  secondary: hsl(0, 0, 80),
  background: hsl(0, 0, 0),
  hover: hsl(0, 0, 10),
  backgroundOpacity: 0.3,
  accent: hsl(210, 100, 52),
  accentForeground: hsl(223, 87, 81),

  scrollbar: hsl(0, 0, 35),

  cardBorder: hsl(0, 0, 30),
  cardBackground: hsl(0, 0, 20),
  cardBackgroundOpacity: 0.7,
};

const lightColors: Colors = {
  primary: hsl(0, 0, 0),
  secondary: hsl(0, 0, 20),
  background: hsl(0, 0, 100),
  hover: hsl(0, 0, 90),
  backgroundOpacity: 0.4,
  accent: hsl(210, 100, 48),
  accentForeground: hsl(0, 0, 0),

  scrollbar: hsl(0, 0, 65),

  cardBorder: hsl(0, 0, 70),
  cardBackground: hsl(0, 0, 100),
  cardBackgroundOpacity: 1,
};

/**
 * Hook to retrieve the appropriate color scheme based on the current theme setting.
 * @returns {Colors} - An object containing color definitions for the current theme.
 */
const useColors = (): Colors => {
  const { biTheme } = useSettingsStore((state) => state) as SettingsState;
  return biTheme === BiTheme.DARK ? darkColors : lightColors;
};

export default useColors;
