import './App.css'

import { Canvas } from '@react-three/fiber'
import { Fullscreen } from '@react-three/uikit'
import { TabBar, TabBarItem } from './components/apfel/tab-bar'
import { Text } from '@react-three/uikit'
import { BoxSelect } from '@react-three/uikit-lucide'
import BottomBar from './components/BottomBar'

function App() {
  return (
    <Canvas>
      <Fullscreen flexDirection="row" padding={10} gap={10}>
        <TabBar defaultValue='Home'>
          <TabBarItem value='Home' icon={<BoxSelect />}>
            <Text>Home</Text>
          </TabBarItem>
          <TabBarItem value='TV' icon={<BoxSelect />}>
            <Text>TV</Text>
          </TabBarItem>
          <TabBarItem value='Guide' icon={<BoxSelect />}>
            <Text>Guide</Text>
          </TabBarItem>
          <TabBarItem value='Settings' icon={<BoxSelect />}>
            <Text>Settings</Text>
          </TabBarItem>
        </TabBar>
        <BottomBar />
      </Fullscreen>
      <color attach="background" args={['blue']} />
    </Canvas>
  )
}

export default App
