import type { Meta, StoryObj } from '@storybook/react';
import GuideStrip from './GuideStrip';
import StoryHelper from '../../StoryHelper';

const meta: Meta<typeof GuideStrip> = {
    title: 'Components/Guide/GuideStrip',
    component: GuideStrip,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    },
    args: {
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
                    <GuideStrip {...args} />
                </StoryHelper>
            </>
        )
    }
};