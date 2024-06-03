import type { Meta, StoryObj } from '@storybook/react';
import PlaybackInfo from './PlaybackInfo';
import XRWindow from './XRWindow';

const meta = {
  title: 'Components/PlaybackInfo',
  component: PlaybackInfo,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
  },
} as Meta<typeof PlaybackInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageSrc: "https://itv-api.ard.de/ardstart/img/services/28106.png",
    title: "Das Erste",
    description: "Surfreportage",
  },
  render: (args) =>
    <XRWindow>
      <PlaybackInfo {...args} />
      <span className=''>Final component will be rendered in a window so story is also in a window</span>
    </XRWindow>
};