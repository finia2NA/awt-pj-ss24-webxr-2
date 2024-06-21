import type { Meta, StoryObj } from '@storybook/react';
import PlaybackControls from './PlaybackControls';
import StoryHelper from '../StoryHelper'



const meta: Meta<typeof PlaybackControls> = {
  title: 'Windows/PlaybackControls',
  component: PlaybackControls,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    channel: 1,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    setChannel: (_channel: number) => { },
    channelImageSrc: "https://itv-api.ard.de/ardstart/img/services/28106.png",
    channelTitle: 'Das Erste',
    channelDescription: 'Surfreportage',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

  render: (args) =>
    <>
      <StoryHelper wide>
        <PlaybackControls {...args} />
      </StoryHelper >
    </>
};