/* eslint-disable no-unused-vars */
// Sphere.js
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const MorphingCutoutSphere = ({ position, scale, sliderValue }) => {

  if (!(sliderValue >= 0 && sliderValue <= 1)) {
    throw new Error('Slider value must be between 0 and 1');
  }

  const thetaLength = Math.PI * sliderValue;

  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, thetaLength]} />
      <meshStandardMaterial color="skyblue" side={THREE.DoubleSide} wireframe={true} />
    </mesh>
  );
}

function App() {
  const [sliderValue, setSliderValue] = useState(0.5);

  return (
    <>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={sliderValue}
        onChange={(e) => setSliderValue(parseFloat(e.target.value))}
      />
      <div style={{ height: '100vh', width: '100vw' }}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <MorphingCutoutSphere position={[0, 0, 0]} scale={[1, 1, 1]} sliderValue={sliderValue} />
          <OrbitControls />
          <color attach="background" args={['black']} />
        </Canvas>
      </div>
    </>
  );
}

export default App;