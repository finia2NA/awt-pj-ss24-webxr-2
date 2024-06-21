import type { Meta, StoryObj } from '@storybook/react';
import StoryHelper from '../../StoryHelper'
import PlaybackInfo from './PlaybackInfo';

const meta: Meta<typeof PlaybackInfo> = {
  title: 'Components/PlaybackControls/PlaybackInfo',
  component: PlaybackInfo,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    imageSrc: "https://itv-api.ard.de/ardstart/img/services/28106.png",
    title: 'Das Erste',
    description: 'Surfdokumentation',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

  render: (args) =>
    <>
      <StoryHelper>
        <PlaybackInfo {...args} />
      </StoryHelper >
    </>
};