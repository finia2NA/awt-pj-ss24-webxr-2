import type { Meta, StoryObj } from '@storybook/react';
import Guide from './Guide';
import StoryHelper from '../../StoryHelper';

const meta: Meta<typeof Guide> = {
    title: 'Components/Guide/Guide',
    component: Guide,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    },
    args: {
        schedule: [
            {
                imageUrl: "https://corsproxy.io/?https%3A%2F%2Fitv-api.ard.de%2Fardstart%2Fimg%2Fservices%2F28106.png",
                schedule: [
                    {
                        title: "Generische Talkshow",
                        startTime: "00:00",
                        endTime: "01:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "01:00",
                        endTime: "02:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "02:00",
                        endTime: "03:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "03:00",
                        endTime: "04:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "04:00",
                        endTime: "05:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "05:00",
                        endTime: "06:00"
                    },
                    {
                        title: "Pause?",
                        startTime: "06:00",
                        endTime: "06:20"
                    },
                    {
                        title: "Un-Generische Talkshow",
                        startTime: "06:20",
                        endTime: "07:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "07:00",
                        endTime: "08:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "08:00",
                        endTime: "09:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "09:00",
                        endTime: "10:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "10:00",
                        endTime: "11:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "11:00",
                        endTime: "12:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "12:00",
                        endTime: "13:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "13:00",
                        endTime: "14:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "14:00",
                        endTime: "15:00"
                    },
                ]
            },
            {
                imageUrl: "https://corsproxy.io/?https%3A%2F%2Fitv-api.ard.de%2Fardstart%2Fimg%2Fservices%2F28106.png",
                schedule: [
                    {
                        title: "Etwas anderes",
                        startTime: "00:00",
                        endTime: "01:20"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "01:20",
                        endTime: "02:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "02:00",
                        endTime: "02:30"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "02:30",
                        endTime: "04:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "04:00",
                        endTime: "05:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "05:00",
                        endTime: "06:00"
                    },
                    {
                        title: "Pause?",
                        startTime: "06:00",
                        endTime: "06:20"
                    },
                    {
                        title: "Un-Generische Talkshow",
                        startTime: "06:20",
                        endTime: "07:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "07:00",
                        endTime: "08:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "08:00",
                        endTime: "09:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "09:00",
                        endTime: "10:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "10:00",
                        endTime: "11:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "11:00",
                        endTime: "12:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "12:00",
                        endTime: "13:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "13:00",
                        endTime: "14:00"
                    },
                    {
                        title: "Generische Talkshow",
                        startTime: "14:00",
                        endTime: "15:00"
                    },
                ]
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

    render: (args) => {
        return (
            <>
                <StoryHelper wide>
                    <Guide {...args} />
                </StoryHelper>
            </>
        )
    }
};