import type { Meta, StoryObj } from '@storybook/react';
import ChannelListElement from './ChannelListElement';
import StoryHelper from '../../StoryHelper'

const meta: Meta<typeof ChannelListElement> = {
    title: 'Components/ChannelList/ChannelListElement',
    component: ChannelListElement,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    },
    args: {
        number: 1,
        name: "TestName",
        description: "TestDescription",
        timeStart: "10:00",
        timeEnd: "11:00",
        imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

    render: (args) => {
        return (
            <>
                <StoryHelper>
                    <ChannelListElement {...args} />
                </StoryHelper>
            </>
        )
    }
};