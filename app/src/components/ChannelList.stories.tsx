import type { Meta, StoryObj } from '@storybook/react';
import ChannelList from './ChannelList';

const meta = {
  title: 'Windows/ChannelList',
  component: ChannelList,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
  },
} as Meta<typeof ChannelList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    
};