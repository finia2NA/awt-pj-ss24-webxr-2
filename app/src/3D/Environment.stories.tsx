import type { Meta, StoryObj } from '@storybook/react';
import Environment from './Environment';
import { Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import { useState, useRef } from 'react';

const meta = {
  title: '3D/Environment',
  component: Environment,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    nightMode: false,
    position: new Vector3(0, 0, 0),
    scale: new Vector3(1, 1, 1),
    viewDirection: new Vector3(0, 0, 1),
    immersionLevel: 0.5,
  },
} as Meta<typeof Environment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

  render: (args) => {

    const [displayOrbitControls, setDisplayOrbitControls] = useState(false);
    const cameraRef = useRef();

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => setDisplayOrbitControls(!displayOrbitControls)}>Toggle Orbit Controls</button>
        <Canvas shadows style={{ height: "720px", width: "1440px" }}>
          <Environment {...args} />
          <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 0]} />
          <gridHelper args={[200, 200]} />
          <axesHelper args={[100]} />
          {displayOrbitControls && (
            <OrbitControls
              camera={cameraRef.current}
              target={[1.1, 0, 0]} // Set the target to the origin
            />
          )}
          <EffectComposer>
            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} kernelSize={KernelSize.HUGE} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>
    );
  }
};