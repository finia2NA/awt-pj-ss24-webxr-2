/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei';
import PropTypes from 'prop-types';
import { XR, Controllers, VRButton } from '@react-three/xr'
import { Interaction } from 'react-xr-ui'



const ExampleReactComponent = ({ count, setCount, isXR }) => {
  const [stateCount, setStateCount] = useState(0)

  return (
    <>
      <h3>React Example Component</h3>
      <img src={reactLogo} alt="React Logo" />
      <img src={viteLogo} alt="Vite Logo" />
      <button> Shared Count: {count}</button>
      <button> State Count: {stateCount}</button>
    </>
  )
}

// This is how you do it in React JS, in TS you would use an interface to define the props
ExampleReactComponent.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  isXR: PropTypes.bool
}

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
          <Html position={[0, 1, -1]} transform>
            <ExampleReactComponent count={count} setCount={setCount} isXR={true} />
          </Html>
        </XR>
      </Canvas>
    </>
  )
}

export default App
