import type { Meta, StoryObj } from '@storybook/react';
import PlaybackControlls from './PlaybackControls';

const meta = {
  title: 'Windows/PlaybackControlls',
  component: PlaybackControlls,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    channel: 1,
    setChannel: (channel: number) => { },
    src: "https://itv-api.ard.de/ardstart/img/services/28106.png",
    channelTitle: 'Das Erste',
    channelDescription: 'Surfreportage',
  },
} as Meta<typeof PlaybackControlls>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {

};