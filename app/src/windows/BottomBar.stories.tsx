import type { Meta, StoryObj } from '@storybook/react';
import BottomBar from './BottomBar'
import StoryHelper from '../StoryHelper'
import { useState } from 'react';


const meta = {
  title: 'Windows/BottomBar',
  component: BottomBar,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    // debugColoring: true
  },
} as Meta<typeof BottomBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) =>
    <StoryHelper>
      <BottomBar {...args} />
    </StoryHelper>
};

export const WithEnvironmentControls: Story = {
  args: {
    environmentControls: true,
  },
  render: (args) => {

    const [envValue, setEnvValue] = useState(0.5);

    return (
      <StoryHelper>
        <BottomBar environmentControls environmentValue={envValue} setEnvironmentValue={setEnvValue} {...args} />
      </StoryHelper>
    )
  }
};