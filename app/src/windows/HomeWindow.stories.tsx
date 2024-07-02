import type { Meta, StoryObj } from '@storybook/react';
import HomeWindow from './HomeWindow';
import StoryHelper from '../StoryHelper'


const meta = {
  title: 'Windows/HomeWindow',
  component: HomeWindow,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
  },
} as Meta<typeof HomeWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) =>
    <StoryHelper wide dynamicKeyboard>
      <HomeWindow {...args} />
    </StoryHelper>
};