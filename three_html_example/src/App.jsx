/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei';
import PropTypes from 'prop-types';
import { Interactive, XR, ARButton, Controllers } from '@react-three/xr'




const ExampleReactComponent = ({ count, setCount }) => {
  const [stateCount, setStateCount] = useState(0)

  return (
    <>
      <h3>React Example Component</h3>
      <img src={reactLogo} alt="React Logo" />
      <img src={viteLogo} alt="Vite Logo" />
      <button onClick={() => setCount((c) => c + 1)}> Shared Count: {count}</button>
      <button onClick={() => setStateCount((c => c + 1))}> State Count: {stateCount}</button>
    </>
  )
}

// This is how you do it in React JS, in TS you would use an interface to define the props
ExampleReactComponent.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired
}

function App() {
  const [count, setCount] = useState(0)

  /*return (
    <>
      <div>
        <h1>Components in a vacuum</h1>
        <ExampleReactComponent count={count} setCount={setCount} />
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
            <ExampleReactComponent count={count} setCount={setCount} />
          </Html>
        </Canvas>
      </div>
    </>
  );*/
  return (
    <>
      <ARButton />
      <Canvas>
        <XR referenceSpace="local">
          <ambientLight />
          <pointLight position={[0, 10, 10]} />
          <Controllers />
          <Html position={[0, 2, -5]} transform>
            <ExampleReactComponent count={count} setCount={setCount} />
          </Html>
        </XR>
      </Canvas>
    </>
  )
}

export default App
