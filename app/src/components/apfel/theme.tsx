import { DefaultProperties, DefaultPropertiesProperties } from '@react-three/uikit'
import { MeshPhongMaterial } from 'three'
import hsl from '../../utils/hsl'

export class GlassMaterial extends MeshPhongMaterial {
  constructor() {
    super({
      specular: '#555',
      shininess: 100,
    })
  }
}

export const colors = {
  foreground: hsl(0, 0, 100),
  background: hsl(0, 0, 0),
  card: hsl(0, 0, 53),
  cardForeground: hsl(0, 0, 100),
  accent: hsl(210, 100, 52),
  accentForeground: hsl(0, 0, 100),
}

export function Defaults(props: DefaultPropertiesProperties) {
  return (
    <DefaultProperties
      scrollbarColor={colors.background}
      scrollbarBorderRadius={4}
      scrollbarOpacity={0.3}
      color={colors.background}
      fontWeight="medium"
      {...props}
    />
  )
}
