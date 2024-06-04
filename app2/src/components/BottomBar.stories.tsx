import type { Meta, StoryObj } from '@storybook/react';
import BottomBar from './BottomBar'
import StoryHelper from './StoryHelper';

const meta = {
  title: 'Components/BottomBar',
  component: BottomBar,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
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