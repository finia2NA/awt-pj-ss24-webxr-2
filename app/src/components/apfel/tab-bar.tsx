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

type TabBarContext = {
  value: unknown
  // eslint-disable-next-line no-unused-vars
  setValue(value: unknown): void
  isExpanded: boolean
  // eslint-disable-next-line no-unused-vars
  setIsExpanded(value: SetStateAction<boolean>): void
}

const TabBarContext = createContext<TabBarContext | undefined>(undefined)

export type TabBarProperties = ContainerProperties & {
  value?: string
  defaultValue?: string
  // eslint-disable-next-line no-unused-vars
  onValueChange?(value: string): void
}

// eslint-disable-next-line no-unused-vars
export const TabBar: (props: TabBarProperties & RefAttributes<ComponentInternals>) => ReactNode = forwardRef(
  ({ value: valueProp, defaultValue, onValueChange, ...props }, ref) => {

    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)
    const value = valueProp !== undefined ? valueProp : internalValue
    const onValueChangeRef = useRef(onValueChange)
    onValueChangeRef.current = onValueChange

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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              timeoutRef.current = setTimeout(() => setIsExpanded(true), 300) as any
            } else {
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

export type TabBarItemProperties = ContainerProperties & {
  value: string
  icon: ReactNode
}

// eslint-disable-next-line no-unused-vars
export const TabBarItem: (props: TabBarItemProperties & RefAttributes<ComponentInternals>) => ReactNode = forwardRef(
  ({ value: tabValue, children, icon, ...props }, ref) => {

    const colors = useColors();

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
