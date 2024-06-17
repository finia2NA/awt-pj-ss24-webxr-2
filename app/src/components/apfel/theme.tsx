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

export function Defaults(props: DefaultPropertiesProperties) {

  const colors = useColors();

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
