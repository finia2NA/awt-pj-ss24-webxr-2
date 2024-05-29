import type { Meta, StoryObj } from '@storybook/react';
import AmbientDemo from './AmbientDemo';
import { AmbientPlayerBlur } from './AmbientPlayer';

const meta = {
    title: 'Components/AmbientDemo',
    component: AmbientDemo,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    },
    // Hier definieren wir das argTypes-Objekt, um die Dropdown-Auswahl zu ermöglichen
    argTypes: {
        blurAmount: {
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            mapping: [AmbientPlayerBlur.xs, AmbientPlayerBlur.sm, AmbientPlayerBlur.md, AmbientPlayerBlur.lg, AmbientPlayerBlur.xl, AmbientPlayerBlur['2xl'], AmbientPlayerBlur['3xl'], AmbientPlayerBlur['4xl'], AmbientPlayerBlur['5xl']],
            control: {
              type: 'select', 
              labels: ["XS", "SM", "MD", "LG", "XL", "2XL", "3XL", "4XL", "5XL"],
            },
        },
    },
} satisfies Meta<typeof AmbientDemo>;

export default meta;

export const Default: StoryObj<typeof meta> = {
    args: {
        blurAmount: AmbientPlayerBlur['2xl'],
    },
};