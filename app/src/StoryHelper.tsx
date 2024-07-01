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

// p much every story will need this so let's just write it once ok?
const StoryHelper = ({ children, wide, dynamicKeyboard }: StoryHelperProps) => {

  const { biTheme, toggleTheme } = useSettingsStore((state) => state) as SettingsState;
  const { visible: keyboardVisible } = useKeyboardStore((state) => state);

  return (
    <>
      <button onClick={toggleTheme}>Curr. Theme: {biTheme}</button>
      <hr />
      <Canvas style={{ height: '500px', width: wide ? '800px' : 'auto' }}>
        <Fullscreen flexDirection="row" padding={10} gap={10}>
          <Root />
          {children}
        </Fullscreen>
        <pointLight position={[-1, 1, 5]} color="#ffffff" intensity={5} />
      </Canvas>
      {dynamicKeyboard && keyboardVisible &&
        <Canvas style={{ height: '500px', width: '800px' }}>
          <Fullscreen flexDirection="row" padding={10} gap={10}>
            <Root />
            <KeyboardUI />
          </Fullscreen>
          <pointLight position={[-1, 1, 5]} color="#ffffff" intensity={5} />
        </Canvas>
      }
    </>
  )
}

export default StoryHelper;