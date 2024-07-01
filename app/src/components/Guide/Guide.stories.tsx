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
        channels: [
            {
                imageUrl: "https://corsproxy.io/?https%3A%2F%2Fitv-api.ard.de%2Fardstart%2Fimg%2Fservices%2F28106.png",
                programs: [
                    {
                        text: "Generische Talkshow",
                        width: 200,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 150,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 220,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 200,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 150,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 220,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 150,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 220,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 150,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 220,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 150,
                    },
                    
                ]
            },
            {
                imageUrl: "https://corsproxy.io/?https%3A%2F%2Fitv-api.ard.de%2Fardstart%2Fimg%2Fservices%2F28106.png",
                programs: [
                    {
                        text: "Generische Talkshow",
                        width: 200,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 150,
                    },
                    {
                        text: "Generische Talkshow",
                        width: 220,
                    }
                ]
            }
        ]
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