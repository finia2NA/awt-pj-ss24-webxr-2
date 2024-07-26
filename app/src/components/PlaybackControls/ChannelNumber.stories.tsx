import type { Meta, StoryObj } from '@storybook/react';
import ChannelNumber from './ChannelNumber';
import StoryHelper from '../../StoryHelper'
import { useState } from 'react';


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
  render: (args) => {
    const [channel, setChannel] = useState(args.channel);

    const tuneUpDown = (direction: number) => {
      console.log(`Tuning ${direction}. Old channel: ${channel}, New channel: ${channel + direction}`);
      setChannel(a => a + direction);
    }

    return (
      <>
        <StoryHelper>
          <ChannelNumber channel={channel} tuneUpDown={tuneUpDown} />
        </StoryHelper >
      </>
    );
  }
};

export const LongNumber: Story = {
  args: {
    channel: 123456789,
  },
  render: (args) =>
    <>
      <StoryHelper>
        <ChannelNumber {...args} />
      </StoryHelper >
    </>
};