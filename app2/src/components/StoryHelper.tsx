import { Canvas } from '@react-three/fiber';
import { Fullscreen, Root } from '@react-three/uikit';

// p much every story will need this so let's just write it once ok?
const StoryHelper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas style={{ height: '500px' }}>
      <Fullscreen flexDirection="row" padding={10} gap={10}>
        <Root />
        {children}
      </Fullscreen>
      <pointLight position={[-1, 1, 5]} color="#ffffff" intensity={5} />
    </Canvas>
  )
}

export default StoryHelper;