import type { Meta, StoryObj } from '@storybook/react';
import ChannelList from './ChannelList';
import StoryHelper from '../../StoryHelper';

const meta: Meta<typeof ChannelList> = {
    title: 'Windows/ChannelList',
    component: ChannelList,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    },
    args: {
        channels: [
            {
                number: 1,
                name: "TestName",
                description: "TestDescription",
                timeStart: "10:00",
                timeEnd: "11:00",
                imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
            },
            {
                number: 2,
                name: "TestName",
                description: "TestDescription",
                timeStart: "11:00",
                timeEnd: "12:00",
                imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
            },
            {
                number: 3,
                name: "TestName",
                description: "TestDescription",
                timeStart: "12:00",
                timeEnd: "13:00",
                imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
            },
            {
                number: 4,
                name: "TestName",
                description: "TestDescription",
                timeStart: "13:00",
                timeEnd: "14:00",
                imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
            },
            {
                number: 5,
                name: "TestName",
                description: "TestDescription",
                timeStart: "14:00",
                timeEnd: "15:00",
                imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
            },
            {
                number: 6,
                name: "TestName",
                description: "TestDescription",
                timeStart: "15:00",
                timeEnd: "16:00",
                imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
            },
            {
                number: 7,
                name: "TestName",
                description: "TestDescription",
                timeStart: "16:00",
                timeEnd: "17:00",
                imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
            },
        ],
        regions: ["Berlin", "Hamburg", "München", "Köln", "Frankfurt", "Stuttgart"],
        time: "12:00",
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