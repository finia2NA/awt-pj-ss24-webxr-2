import { ComponentInternals, Container, ContainerProperties, DefaultProperties } from '@react-three/uikit'
import { ReactNode, RefAttributes, forwardRef } from 'react'
import { GlassMaterial, LightGlassMaterial } from './theme.js'
import useColors from '../../hooks/useColors.js'
import useDisplayModeStore, { BiTheme, DisplayModeState } from '../../hooks/useDisplayModeStore.js'

export type CardProperties = ContainerProperties

export const Card: (props: CardProperties & RefAttributes<ComponentInternals>) => ReactNode = forwardRef(
  ({ children, ...props }, ref) => {

    const colors = useColors()
    const biTheme = useDisplayModeStore((state) => state.biTheme) as DisplayModeState;

    return (
      <Container
        backgroundColor={colors.cardBackground}
        backgroundOpacity={colors.cardBackgroundOpacity}
        borderColor={colors.cardForeground}
        borderOpacity={0.8}
        borderWidth={4}
        borderBend={0.3}
        panelMaterialClass={biTheme === BiTheme.DARK ? GlassMaterial : LightGlassMaterial}
        borderRadius={32}
        ref={ref}
        {...props}
      >
        <DefaultProperties color={colors.foreground}>{children}</DefaultProperties>
      </Container>
    )
  },
)
