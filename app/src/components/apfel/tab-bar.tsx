import { ComponentInternals, Container, ContainerProperties, DefaultProperties } from '@react-three/uikit'
import {
  ReactNode,
  RefAttributes,
  SetStateAction,
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Card } from './card'
import useColors from '../../hooks/useColors'

// Define the context type for the TabBar
type TabBarContext = {
  value: unknown
  setValue(value: unknown): void
  isExpanded: boolean
  setIsExpanded(value: SetStateAction<boolean>): void
}

// Create the TabBar context with an undefined default value
const TabBarContext = createContext<TabBarContext | undefined>(undefined)

// Define the properties for the TabBar component
export type TabBarProperties = ContainerProperties & {
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
}

/**
 * TabBar Component
 * 
 * A container that manages tabs and their state, including the current selected tab and whether
 * the tab bar is expanded.
 * 
 * @param {TabBarProperties & RefAttributes<ComponentInternals>} props - The properties for the TabBar component.
 * @returns {ReactNode} The rendered TabBar component.
 */
export const TabBar: (props: TabBarProperties & RefAttributes<ComponentInternals>) => ReactNode = forwardRef(
  ({ value: valueProp, defaultValue, onValueChange, ...props }, ref) => {

    // Internal state for the selected tab value
    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)
    const value = valueProp !== undefined ? valueProp : internalValue
    const onValueChangeRef = useRef(onValueChange)
    onValueChangeRef.current = onValueChange

    // Internal state for whether the tab bar is expanded
    const [isExpanded, setIsExpanded] = useState(false)
    const context = useMemo(
      () => ({
        isExpanded,
        setIsExpanded,
        value,
        setValue: (value: string) => {
          setInternalValue(value)
          onValueChangeRef.current?.(value)
        },
      }),
      [isExpanded, value],
    )

    const timeoutRef = useRef<number>()

    return (
      <TabBarContext.Provider value={context}>
        <Card
          minHeight={68}
          borderRadius={34}
          minWidth={68}
          padding={8}
          borderWidth={4}
          flexDirection="column"
          gapRow={8}
          onHoverChange={(hovered) => {
            if (hovered) {
              // Set a timeout to expand the tab bar after 300ms
              timeoutRef.current = setTimeout(() => setIsExpanded(true), 300) as any
            } else {
              // Clear the timeout and collapse the tab bar
              clearTimeout(timeoutRef.current)
              setIsExpanded(false)
            }
          }}
          ref={ref}
          {...props}
        />
      </TabBarContext.Provider>
    )
  },
)

// Define the properties for the TabBarItem component
export type TabBarItemProperties = ContainerProperties & {
  value: string
  icon: ReactNode
}

/**
 * TabBarItem Component
 * 
 * Represents an item in the TabBar. It can contain an icon and children, and it manages its
 * selection state based on the TabBar context.
 * 
 * @param {TabBarItemProperties & RefAttributes<ComponentInternals>} props - The properties for the TabBarItem component.
 * @returns {ReactNode} The rendered TabBarItem component.
 */
export const TabBarItem: (props: TabBarItemProperties & RefAttributes<ComponentInternals>) => ReactNode = forwardRef(
  ({ value: tabValue, children, icon, ...props }, ref) => {

    const colors = useColors();

    // Access the TabBar context to determine the current state and set the selected tab
    const { isExpanded, value, setValue } = useContext(TabBarContext)!
    const isSelected = value === tabValue

    return (
      <Container
        minWidth={44}
        height={44}
        borderRadius={22}
        backgroundColor={colors.primary}
        backgroundOpacity={isSelected ? 0.2 : 0}
        hover={isSelected ? undefined : { backgroundOpacity: 0.1 }}
        cursor="pointer"
        flexDirection="row"
        alignItems="center"
        gapColumn={10}
        {...props}
        ref={ref}
        onClick={(e) => {
          // Set the selected tab value when the item is clicked
          setValue(tabValue)
          props.onClick?.(e)
        }}
      >
        <DefaultProperties color={colors.primary} fontSize={16}>
          <Container width={44} flexDirection="row" justifyContent="center">
            <DefaultProperties width={22} height={22}>
              {icon}
            </DefaultProperties>
          </Container>
          {isExpanded && <Container paddingRight={28}>{children}</Container>}
        </DefaultProperties>
      </Container>
    )
  },
)
