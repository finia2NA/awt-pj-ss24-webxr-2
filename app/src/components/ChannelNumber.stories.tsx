import type { Meta, StoryObj } from '@storybook/react';
import ChannelNumber from './ChannelNumber';

const meta = {
  title: 'Components/ChannelNumber',
  component: ChannelNumber,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    channel: 1,
    setChannel: (channel: number) => { console.log(channel) },
  },
} as Meta<typeof ChannelNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};