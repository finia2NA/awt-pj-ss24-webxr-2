import type { Meta, StoryObj } from '@storybook/react';
// import StoryHelper from '../components/StoryHelper';
import Environment from './environment';
import { Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const meta = {
  title: '3D/Environment',
  component: Environment,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    position: new Vector3(0, 0, 0),
    scale: new Vector3(1, 1, 1),
    viewDirection: new Vector3(0, 0, 1),
    immersionLevel: 0.5,
  },
} as Meta<typeof Environment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <hemisphereLight intensity={2} color={0xaaaaff} />
      <Environment {...args} />


      <PerspectiveCamera makeDefault position={[0, 0, 200]} />
      <OrbitControls />
    </Canvas>
  )
};