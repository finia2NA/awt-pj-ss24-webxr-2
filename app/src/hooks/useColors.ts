import { Color } from "three"
import useDisplayModeStore from "./useDisplayModeStore"


function hsl(h: number, s: number, l: number) {
  return new Color().setHSL(h / 360, s / 100, l / 100, 'srgb')
}

interface Colors {
  // main colors
  foreground: Color;
  background: Color;
  backgroundOpacity: number;
  accent: Color;
  accentForeground: Color;

  // card colors
  cardForeground: Color;
  cardBackground: Color;
  cardBackgroundOpacity: number;
}


const darkColors: Colors = {
  foreground: hsl(0, 0, 100),
  background: hsl(0, 0, 0),
  backgroundOpacity: 0.3,
  accent: hsl(210, 100, 52),
  accentForeground: hsl(0, 0, 100),

  cardForeground: hsl(0, 0, 100),
  cardBackground: hsl(0, 0, 20),
  cardBackgroundOpacity: 0.4,

}

const lightColors: Colors = {
  foreground: hsl(0, 0, 0),
  background: hsl(0, 0, 100),
  backgroundOpacity: 0.4,
  accent: hsl(210, 100, 48),
  accentForeground: hsl(0, 0, 0),

  cardForeground: hsl(0, 0, 0), // rn just used for card border
  cardBackground: hsl(0, 0, 100),
  cardBackgroundOpacity: 0.4,
}



const useColors = () => {
  const mode = useDisplayModeStore((state) => state.mode);
  return mode === 'dark' ? darkColors : lightColors;
}

export default useColors