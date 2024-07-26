import { DefaultProperties, DefaultPropertiesProperties } from '@react-three/uikit'
import { MeshPhongMaterial } from 'three'
import useColors from '../../hooks/useColors'

/**
 * GlassMaterial Class
 * 
 * A custom material class extending `MeshPhongMaterial` to represent a glass-like material.
 * It has a specific specular color and shininess to give a glassy appearance.
 */
export class GlassMaterial extends MeshPhongMaterial {
  constructor() {
    super({
      specular: '#474747', // Specular color for highlights
      shininess: 20,       // Shininess factor for reflective properties
    })
  }
}

/**
 * LightGlassMaterial Class
 * 
 * A custom material class extending `MeshPhongMaterial` to represent a lighter glass-like material.
 * It has a white color, high specular reflection, and high reflectivity.
 */
export class LightGlassMaterial extends MeshPhongMaterial {
  constructor() {
    super({
      color: '#ffffff',       // Base color of the material
      specular: '#ffffff',    // Specular color for highlights
      shininess: 10,          // Shininess factor for reflective properties
      reflectivity: 1,        // Reflectivity of the material
    })
  }
}

/**
 * Defaults Component
 * 
 * A functional component that sets default properties for UI elements using the `DefaultProperties` component.
 * It applies colors and styles from the `useColors` hook.
 * 
 * @param {DefaultPropertiesProperties} props - The properties for the DefaultProperties component.
 * @returns {JSX.Element} The rendered DefaultProperties component with applied defaults.
 */
export function Defaults(props: DefaultPropertiesProperties) {
  const colors = useColors();

  return (
    <DefaultProperties
      scrollbarColor={colors.primary}          // Color of the scrollbar
      scrollbarBorderRadius={4}                // Border radius of the scrollbar
      scrollbarOpacity={0.3}                   // Opacity of the scrollbar
      color={colors.cardBackground}            // Default text color
      fontWeight="medium"                      // Default font weight
      {...props}                               // Spread any additional properties
    />
  )
}
