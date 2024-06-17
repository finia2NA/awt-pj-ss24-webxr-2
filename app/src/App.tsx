/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { XR, Controllers, VRButton } from '@react-three/xr'
import ComponentAssembly from './ComponentAssembly'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <VRButton />
      <Canvas>
        <XR referenceSpace="local">
          <ambientLight />
          <pointLight position={[0, 10, 10]} />
          <Controllers />
          <mesh position={[0, 1, -5]} onClick={() => setCount(count + 1)}>
            <boxGeometry />
            <ComponentAssembly />
          </mesh>
          <color attach="background" args={['#272730']} />
        </XR>
      </Canvas>
    </>
  )
}

export default App
