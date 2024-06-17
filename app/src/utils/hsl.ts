import { Color } from 'three'

function hsl(h: number, s: number, l: number) {
  return new Color().setHSL(h / 360, s / 100, l / 100, 'srgb')
}

export default hsl