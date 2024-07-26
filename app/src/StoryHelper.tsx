import { Canvas } from '@react-three/fiber';
import { Fullscreen, Root } from '@react-three/uikit';
import useSettingsStore, { SettingsState } from './hooks/useSettingsStore';
import KeyboardUI from './components/KeyboardUI';
import useKeyboardStore from './hooks/useKeyboardStore.ts';

interface StoryHelperProps {
  children: React.ReactNode;
  wide?: boolean;
  // When enabled, show the keyboard when needed
  dynamicKeyboard?: boolean;
}

/**
 * StoryHelper Component
 * 
 * This component serves as a helper for stories, a 3D canvas and functionality
 * such as theme toggling and optional dynamic keyboard display.
 * 
 * @param {React.ReactNode} children - The child elements to be rendered inside the Canvas.
 * @param {boolean} [wide] - Determines if the Canvas should be wide (800px) or auto-width.
 * @param {boolean} [dynamicKeyboard] - When true, displays the keyboard UI when needed.
 */
const StoryHelper = ({ children, wide, dynamicKeyboard }: StoryHelperProps) => {

  // Retrieve theme and toggle function from settings store
  const { biTheme, toggleTheme } = useSettingsStore((state) => state) as SettingsState;

  // Retrieve keyboard visibility state from keyboard store
  const { visible: keyboardVisible } = useKeyboardStore((state) => state);

  return (
    <>
      {/* Button to toggle the theme */}
      <button onClick={toggleTheme}>Curr. Theme: {biTheme}</button>
      <hr />

      {/* Main Canvas with adjustable width */}
      <Canvas style={{ height: '500px', width: wide ? '800px' : 'auto' }}>
        <Fullscreen flexDirection="row" padding={10} gap={10}>
          <Root />
          {children}
        </Fullscreen>
        <ambientLight intensity={1.5} />
        <pointLight position={[-1, 1, 5]} color="#ffffff" intensity={3} />
      </Canvas>

      {/* Conditional rendering of the dynamic keyboard Canvas */}
      {dynamicKeyboard && keyboardVisible &&
        <Canvas style={{ height: '500px', width: '800px' }}>
          <Fullscreen flexDirection="row" padding={10} gap={10}>
            <Root />
            <KeyboardUI />
          </Fullscreen>
          <ambientLight intensity={1.5} />
          <pointLight position={[-1, 1, 5]} color="#ffffff" intensity={3} />
        </Canvas>
      }
    </>
  )
}

export default StoryHelper;
