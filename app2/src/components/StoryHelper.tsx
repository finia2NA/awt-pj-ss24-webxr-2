import { Canvas } from '@react-three/fiber';
import { Fullscreen, Root } from '@react-three/uikit';

const StoryHelper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas style={{ height: '500px' }}>
      <Fullscreen flexDirection="row" padding={10} gap={10}>
        <Root />
        {children}
        <color attach="background" args={['#272730']} />
      </Fullscreen>
    </Canvas>
  )
}

export default StoryHelper;