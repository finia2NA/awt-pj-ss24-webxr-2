import type { Meta, StoryObj } from '@storybook/react';
import MorphingSphere from './MorphingSphere';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const meta: Meta<typeof MorphingSphere> = {
  title: '3D/MorphingSphere',
  component: MorphingSphere,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    sliderValue: 0.5,
    position: [0, 0, 0],
    scale: [1, 1, 1]
  },
  argTypes: {
    sliderValue: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) =>
    <div style={{ height: "600px", width: "600px" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <MorphingSphere {...args} />
        <OrbitControls />
        <color attach="background" args={['black']} />
      </Canvas>
    </div>
};
