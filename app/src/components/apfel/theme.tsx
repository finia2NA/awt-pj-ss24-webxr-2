import { DefaultProperties, DefaultPropertiesProperties } from '@react-three/uikit'
import { MeshPhongMaterial } from 'three'
import useColors from '../../hooks/useColors'

export class GlassMaterial extends MeshPhongMaterial {

  constructor() {
    super({
      specular: '#555',
      shininess: 100,
    })
  }
}

export class LightGlassMaterial extends MeshPhongMaterial {
  constructor() {
    super({
      specular: '#555',
      shininess: 20,
    })
  }
}

export function Defaults(props: DefaultPropertiesProperties) {

  const colors = useColors();

  return (
    <DefaultProperties
      scrollbarColor={colors.foreground}
      scrollbarBorderRadius={4}
      scrollbarOpacity={0.3}
      color={colors.cardBackground}
      fontWeight="medium"
      {...props}
    />
  )
}
