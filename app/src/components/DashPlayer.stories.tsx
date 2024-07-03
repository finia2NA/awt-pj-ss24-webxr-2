import type { Meta, StoryObj } from '@storybook/react';
import DashPlayer from './DashPlayer';
import StoryHelper from '../StoryHelper';

const meta: Meta<typeof DashPlayer> = {
  title: 'Components/DashPlayer',
  component: DashPlayer,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    src: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
    width: 640,
    channelTitle: "Channel Title",
    channelDescription: "Channel Description",
    channelNumber: 1,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

  render: (args) =>
    <>
      <StoryHelper wide>
        <DashPlayer {...args} />
      </StoryHelper >
    </>
};