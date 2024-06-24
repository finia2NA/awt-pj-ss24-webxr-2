import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';
import StoryHelper from '../../StoryHelper'

const meta: Meta<typeof Dropdown> = {
    title: 'Components/ChannelList/Dropdown',
    component: Dropdown,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    },
    args: {
        items: ["Item 1", "Longer Item 2", "Item 3", "Frankfurt am Main", "Way too long to fit", "This shouldn't even fit on the other one then I think"],
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [activeIndex, setActiveIndex] = useState(3);
        return (
            <>
                <StoryHelper>
                    <Dropdown 
                        {...args} 
                        activeIndex={activeIndex}
                        onSelectItem={setActiveIndex}
                    />
                </StoryHelper>
            </>
        )
    }
};