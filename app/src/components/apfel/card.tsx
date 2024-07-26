import { ComponentInternals, Container, ContainerProperties, DefaultProperties } from '@react-three/uikit'
import { ReactNode, RefAttributes, forwardRef } from 'react'
import { GlassMaterial, LightGlassMaterial } from './theme.js'
import useColors from '../../hooks/useColors.js'
import useSettingsStore, { BiTheme, SettingsState } from '../../hooks/useSettingsStore.js'

/**
 * CardProperties defines the properties that can be passed to the Card component.
 */
export type CardProperties = ContainerProperties

/**
 * Card component using forwardRef to pass refs to the DOM element.
 * 
 * @param {CardProperties & RefAttributes<ComponentInternals>} props - The properties for the Card component.
 * @param {React.Ref<ComponentInternals>} ref - The ref to be forwarded to the underlying DOM element.
 * @returns {ReactNode} The rendered Card component.
 */
export const Card: (props: CardProperties & RefAttributes<ComponentInternals>) => ReactNode = forwardRef(
  ({ children, ...props }, ref) => {

    const colors = useColors()
    const { biTheme } = useSettingsStore((state) => state) as SettingsState;

    return (
      <Container
        backgroundColor={colors.cardBackground}
        backgroundOpacity={colors.cardBackgroundOpacity}
        borderColor={colors.cardBorder}
        borderOpacity={0.8}
        borderWidth={4}
        borderBend={0.3}
        panelMaterialClass={biTheme === BiTheme.DARK ? GlassMaterial : LightGlassMaterial}
        borderRadius={32}
        ref={ref}
        {...props}
      >
        <DefaultProperties color={colors.primary}>{children}</DefaultProperties>
      </Container>
    )
  },
)
