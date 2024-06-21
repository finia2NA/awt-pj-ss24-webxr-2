import type { Meta, StoryObj } from '@storybook/react';
import ChannelNumber from './ChannelNumber';
import StoryHelper from '../../StoryHelper'


const meta: Meta<typeof ChannelNumber> = {
  title: 'Components/PlaybackControls/ChannelNumber',
  component: ChannelNumber,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    channel: 0,
    setChannel: (newChannel) => { console.log(newChannel) }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

  render: (args) =>
    <>
      <StoryHelper>
        <ChannelNumber {...args}/>
      </StoryHelper >
    </>
};