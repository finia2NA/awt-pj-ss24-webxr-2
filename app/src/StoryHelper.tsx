import { Canvas } from '@react-three/fiber';
import { Fullscreen, Root } from '@react-three/uikit';
import useDisplayModeStore, { DisplayModeState } from './hooks/useDisplayModeStore';

interface StoryHelperProps {
  children: React.ReactNode;
  wide?: boolean;
}

// p much every story will need this so let's just write it once ok?
const StoryHelper = ({ children, wide }: StoryHelperProps) => {

  const { biTheme, toggleTheme } = useDisplayModeStore((state) => state) as DisplayModeState;

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
    </>
  )
}

export default StoryHelper;