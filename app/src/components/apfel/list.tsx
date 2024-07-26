import { ComponentInternals, Container, ContainerProperties, DefaultProperties } from '@react-three/uikit'
import { ReactNode, RefAttributes, createContext, forwardRef, useContext } from 'react'
import useColors from '../../hooks/useColors'

// Define the types for the list
type Type = 'plain' | 'inset'

// Create a context for the list type with a default value of 'plain'
const ListContext = createContext<Type>('plain')

// Define the properties for the List component
type ListProperties = ContainerProperties & {
  type?: Type
}

/**
 * List Component
 * 
 * A container that organizes its children in a vertical list. The appearance of the list 
 * can be customized using the `type` property which determines the styling.
 * 
 * @param {ListProperties & RefAttributes<ComponentInternals>} props - The properties for the List component.
 * @returns {ReactNode} The rendered List component.
 */
export const List: (props: ListProperties & RefAttributes<ComponentInternals>) => ReactNode = forwardRef(
  ({ type = 'plain', ...props }, ref) => {
    return (
      <ListContext.Provider value={type}>
        <Container flexDirection="column" alignItems="stretch" gapRow={type === 'plain' ? 8 : 1} ref={ref} {...props} />
      </ListContext.Provider>
    )
  },
)

// Define the properties for the ListItem component
export type ListItemProperties = ContainerProperties & {
  subtitle?: ReactNode
  selected?: boolean
  leadingAccessory?: ReactNode
  trailingAccessory?: ReactNode
  isFirst?: boolean
  isLast?: boolean
}

/**
 * ListItem Component
 * 
 * Represents an item in the List. It can contain leading and trailing accessories, a subtitle, 
 * and can be styled based on selection and position within the list.
 * 
 * @param {ListItemProperties & RefAttributes<ComponentInternals>} props - The properties for the ListItem component.
 * @returns {ReactNode} The rendered ListItem component.
 */
export const ListItem: (props: ListItemProperties & RefAttributes<ComponentInternals>) => ReactNode = forwardRef(
  ({ children, subtitle, selected, leadingAccessory, trailingAccessory, isFirst, isLast, ...props }, ref) => {
    const colors = useColors();
    const type = useContext(ListContext);

    return (
      <Container
        height={subtitle ? 72 : 60}
        borderRadius={type === 'plain' ? 16 : undefined}
        borderTopRadius={type === 'inset' ? (isFirst ? 16 : 0) : undefined}
        borderBottomRadius={type === 'inset' ? (isLast ? 16 : 0) : undefined}
        paddingX={20}
        flexDirection="row"
        alignItems="center"
        gapColumn={16}
        backgroundColor={type === 'plain' ? colors.primary : colors.background}
        backgroundOpacity={type === 'plain' ? (selected ? 0.2 : 0) : 0.2}
        hover={{
          backgroundOpacity: type === 'plain' ? (selected ? 0.2 : 0.1) : 0.1,
        }}
        active={
          type === 'plain'
            ? {
              backgroundOpacity: 0.3,
            }
            : undefined
        }
        cursor="pointer"
        ref={ref}
        {...props}
      >
        <DefaultProperties color={colors.primary}>
          {leadingAccessory && <Container>{leadingAccessory}</Container>}
          <Container flexDirection="column" flexGrow={1}>
            <DefaultProperties fontSize={18}>{children}</DefaultProperties>
            <DefaultProperties fontSize={14} opacity={0.5}>
              {subtitle}
            </DefaultProperties>
          </Container>
          {trailingAccessory && <Container>{trailingAccessory}</Container>}
        </DefaultProperties>
      </Container>
    )
  },
)
