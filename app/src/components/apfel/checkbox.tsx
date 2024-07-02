import { ComponentInternals, Container, ContainerProperties } from '@react-three/uikit'
import { Check } from '@react-three/uikit-lucide'
import { ReactNode, RefAttributes, forwardRef, useState } from 'react'
import useColors from '../../hooks/useColors'

type CheckboxProperties = ContainerProperties & {
  selected?: boolean
  defaultSelected?: boolean
  disabled?: boolean
  onSelectedChange?(value: boolean): void
}

export const Checkbox: (props: CheckboxProperties & RefAttributes<ComponentInternals>) => ReactNode = forwardRef(
  ({ selected, disabled = false, defaultSelected, onSelectedChange, ...props }, ref) => {

    const colors = useColors();

    const [internalValue, setInternalValue] = useState(defaultSelected ?? false)
    const value = selected != null ? selected : internalValue

    return (
      <Container
        width={28}
        height={28}
        borderWidth={2}
        borderRadius={15}
        backgroundColor={!disabled && value ? colors.accent : colors.primary}
        backgroundOpacity={!disabled && value ? 0.9 : 0.1}
        borderColor={!disabled && value ? colors.accent : colors.primary}
        hover={
          disabled
            ? undefined
            : {
              backgroundOpacity: value ? 1 : 0.3,
              backgroundColor: value ? colors.accent : colors.primary,
              borderColor: value ? colors.accent : colors.primary,
            }
        }
        borderOpacity={disabled ? 0.2 : value ? 1 : 0.5}
        justifyContent="center"
        alignItems="center"
        cursor={disabled ? undefined : 'pointer'}
        ref={ref}
        {...props}
        onClick={(e) => {
          if (disabled) {
            return
          }
          setInternalValue(!value)
          onSelectedChange?.(!value)
          props.onClick?.(e)
        }}
      >
        {value && <Check height={18} width={18} color={colors.accentForeground} />}
      </Container>
    )
  },
)
