import type { Meta, StoryObj } from '@storybook/react';
import ChannelList from './ChannelList';
import StoryHelper from '../StoryHelper';

const meta: Meta<typeof ChannelList> = {
    title: 'Windows/ChannelList',
    component: ChannelList,
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
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

    render: (args) => {
        return (
            <>
                <StoryHelper>
                    <ChannelList {...args} />
                </StoryHelper>
            </>
        )
    }
};