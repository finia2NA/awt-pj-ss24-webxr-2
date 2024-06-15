import type { Meta, StoryObj } from '@storybook/react';
import Environment from './environment';
import { Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

const meta = {
  title: '3D/Environment',
  component: Environment,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    useOrbitControls: false,
    nightMode: false,
    position: new Vector3(0, 0, 0),
    scale: new Vector3(1, 1, 1),
    viewDirection: new Vector3(0, 0, 1),
    immersionLevel: 0.5,
  },
} as Meta<typeof Environment>;

export default meta;
type Story = StoryObj<typeof meta>;

const BoxHelper = () => {
  return (
    <mesh position={[30, 20, -6]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="red" transparent opacity={1} depthTest={false} />
    </mesh>)
}

export const Default: Story = {
  render: (args) => {
    return (
      <Canvas shadows style={{ height: "720px", width: "1440px" }}>
        <Environment {...args} />
        <PerspectiveCamera makeDefault position={[25, 5, 25]} ref={(camera) => camera && camera.lookAt(new Vector3(15, 5, 0))} />
        <gridHelper args={[200, 200]} />
        <axesHelper args={[100]} />
        {args.useOrbitControls && <OrbitControls />}
        <EffectComposer>
          {/* <DepthOfField focusDistance={30} focalLength={0.02} bokehScale={2} height={480} /> */}
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} kernelSize={KernelSize.HUGE} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
        {/* <BoxHelper /> */}
      </Canvas>
    );
  }
};
