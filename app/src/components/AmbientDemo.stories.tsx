import type { Meta, StoryObj } from '@storybook/react';
import AmbientDemo from './AmbientDemo';

const meta = {
    title: 'Components/AmbientDemo',
    component: AmbientDemo,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof AmbientDemo>;

export default meta;

export const Default: StoryObj<typeof meta> = {
    args: {},
};