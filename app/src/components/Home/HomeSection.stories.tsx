import type { Meta, StoryObj } from '@storybook/react';
import HomeSection from './HomeSection';
import StoryHelper from '../../StoryHelper';

const meta: Meta<typeof HomeSection> = {
    title: 'Components/Home/HomeSection',
    component: HomeSection,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    },
    args: {
        title: "Your Favorite Channels",
        altText: "No data available",
        channels: [
            {
                name: "TestName",
                description: "TestDescription",
                timeStart: "10:00",
                timeEnd: "11:00",
                //imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
                imageUrl: "https://corsproxy.io/?https%3A%2F%2Fitv-api.ard.de%2Fardstart%2Fimg%2Fservices%2F28106.png"
            },
            {
                name: "TestName",
                description: "TestDescription",
                timeStart: "10:00",
                timeEnd: "11:00",
                //imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
                imageUrl: "https://corsproxy.io/?https%3A%2F%2Fitv-api.ard.de%2Fardstart%2Fimg%2Fservices%2F28106.png"
            },
            {
                name: "TestName",
                description: "TestDescription",
                timeStart: "10:00",
                timeEnd: "11:00",
                //imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
                imageUrl: "https://corsproxy.io/?https%3A%2F%2Fitv-api.ard.de%2Fardstart%2Fimg%2Fservices%2F28106.png"
            },
            {
                name: "TestName",
                description: "TestDescription",
                timeStart: "10:00",
                timeEnd: "11:00",
                //imageUrl: "https://itv-api.ard.de/ardstart/img/services/28106.png",
                imageUrl: "https://corsproxy.io/?https%3A%2F%2Fitv-api.ard.de%2Fardstart%2Fimg%2Fservices%2F28106.png"
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
                <StoryHelper>
                    <HomeSection {...args} />
                </StoryHelper>
            </>
        )
    }
};

export const Empty: Story = {
    render: (args) => {
        return (
            <>
                <StoryHelper>
                    <HomeSection title='Empty Section' channels={[]} altText='This section is empty' />
                </StoryHelper>
            </>
        )
    }
};