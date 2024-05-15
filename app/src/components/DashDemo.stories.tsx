import type { Meta, StoryObj } from '@storybook/react';
import DashDemo from './DashDemo';

const meta = {
    title: 'Components/DashDemo',
    component: DashDemo,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof DashDemo>;

export default meta;

export const Default: StoryObj<typeof meta> = {
    args: {},
};