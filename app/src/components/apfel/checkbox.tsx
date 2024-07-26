import { ComponentInternals, Container, ContainerProperties } from '@react-three/uikit'
import { Check } from '@react-three/uikit-lucide'
import { ReactNode, RefAttributes, forwardRef, useState } from 'react'
import useColors from '../../hooks/useColors'

/**
 * CheckboxProperties defines the properties that can be passed to the Checkbox component.
 */
type CheckboxProperties = ContainerProperties & {
  selected?: boolean
  defaultSelected?: boolean
  disabled?: boolean
  /**
   * Callback function called when the selected state changes.
   * @param {boolean} value - The new selected state.
   */
  onSelectedChange?(value: boolean): void
}

/**
 * Checkbox component using forwardRef to pass refs to the DOM element.
 * 
 * @param {CheckboxProperties & RefAttributes<ComponentInternals>} props - The properties for the Checkbox component.
 * @param {React.Ref<ComponentInternals>} ref - The ref to be forwarded to the underlying DOM element.
 * @returns {ReactNode} The rendered Checkbox component.
 */
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
