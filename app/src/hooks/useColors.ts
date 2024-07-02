import { Color } from "three"
import useSettingsStore, { BiTheme, SettingsState } from "./useSettingsStore"


function hsl(h: number, s: number, l: number) {
  return new Color().setHSL(h / 360, s / 100, l / 100, 'srgb')
}

interface Colors {
  // main colors
  primary: Color;
  secondary: Color;
  background: Color;
  backgroundOpacity: number;
  accent: Color;
  accentForeground: Color;

  scrollbar: Color;

  // card colors
  cardForeground: Color;
  cardBackground: Color;
  cardBackgroundOpacity: number;
}


const darkColors: Colors = {
  primary: hsl(0, 0, 100),
  secondary: hsl(0, 0, 80),
  background: hsl(0, 0, 0),
  backgroundOpacity: 0.3,
  accent: hsl(210, 100, 52),
  accentForeground: hsl(223, 87, 81),

  scrollbar: hsl(0, 0, 35),

  cardForeground: hsl(0, 0, 100),
  cardBackground: hsl(0, 0, 20),
  cardBackgroundOpacity: 0.4,

}

const lightColors: Colors = {
  primary: hsl(0, 0, 0),
  secondary: hsl(0, 0, 20),
  background: hsl(0, 0, 100),
  backgroundOpacity: 0.4,
  accent: hsl(210, 100, 48),
  accentForeground: hsl(0, 0, 0),

  scrollbar: hsl(0, 0, 65),

  cardForeground: hsl(0, 0, 0), // rn just used for card border
  cardBackground: hsl(0, 0, 100),
  cardBackgroundOpacity: 0.4,
}



const useColors = () => {
  const { biTheme } = useSettingsStore((state) => state) as SettingsState;
  return biTheme === BiTheme.DARK ? darkColors : lightColors;
}

export default useColors