import type { Meta, StoryObj } from '@storybook/react';
import HeartButton from './HeartButton';
import StoryHelper from '../../StoryHelper'
import useHeartedChannelsStore from '../../hooks/useHeartedChannelsStore';

const meta: Meta<typeof HeartButton> = {
  title: 'components/ChannelList/HeartButton',
  component: HeartButton,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {

    const heartedChannels = useHeartedChannelsStore((state) => state.heartedChannels);

    return (
      <>
        <StoryHelper>
          <HeartButton channelID='1' />
          <HeartButton channelID='2' />
          <HeartButton channelID='3' />
          <HeartButton channelID='4' />
        </StoryHelper>

        <span style={{ backgroundColor: "white" }}>Currently hearted channels:{Array.from(heartedChannels).join(", ")}


          <br /><br />
          Note: when it seems like the click isn't going through, this is because react presses the button 2x (you can confirm this in the console. I think this would be fixed in prod, if not is fixable)
        </span>
      </>
    )
  }
};
