/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei';

const ExampleReactComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <h3>React Example Component</h3>
      <img src={reactLogo} alt="React Logo" />
      <img src={viteLogo} alt="Vite Logo" />
      <button onClick={() => setCount((count) => count + 1)}>Count: {count}</button>
    </>
  )
}

function App() {

  return (
    <>
      <div>
        <h1>Components in a vacuum</h1>
        <ExampleReactComponent />
      </div>
      <div>
        <h1>Components in three</h1>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          style={{ background: '#84e0ff' }} // Light blue background color
        >
          <OrbitControls />
          <ambientLight />
          <Html position={[0, 0.5, 2]} transform>
            <ExampleReactComponent />
          </Html>
        </Canvas>
      </div>
    </>
  );
}

export default App
