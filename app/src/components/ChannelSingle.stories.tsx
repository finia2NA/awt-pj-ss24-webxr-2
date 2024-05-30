import type { Meta, StoryObj } from '@storybook/react';
import ChannelSingle from './ChannelSingle';

const meta = {
  title: 'Components/ChannelSingle',
  component: ChannelSingle,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
  },
} as Meta<typeof ChannelSingle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        src: "https://itv-api.ard.de/ardstart/img/services/28106.png",
        title: "Das Erste",
        description: "Surfreportage",
        time: "13:00 → 14:15",
    },
};