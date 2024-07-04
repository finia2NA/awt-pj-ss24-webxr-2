import { DefaultProperties, DefaultPropertiesProperties } from '@react-three/uikit'
import { MeshPhongMaterial } from 'three'
import useColors from '../../hooks/useColors'

export class GlassMaterial extends MeshPhongMaterial {

  constructor() {
    super({
      specular: '#474747',
      shininess: 20,
    })
  }
}

export class LightGlassMaterial extends MeshPhongMaterial {
  constructor() {
    super({
      color: '#ffffff',
      specular: '#ffffff',
      shininess: 10,
      reflectivity: 1,
    })
  }
}

export function Defaults(props: DefaultPropertiesProperties) {

  const colors = useColors();

  return (
    <DefaultProperties
      scrollbarColor={colors.primary}
      scrollbarBorderRadius={4}
      scrollbarOpacity={0.3}
      color={colors.cardBackground}
      fontWeight="medium"
      {...props}
    />
  )
}
