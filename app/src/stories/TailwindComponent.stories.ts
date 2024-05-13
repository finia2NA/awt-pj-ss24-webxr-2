import type { Meta, StoryObj } from '@storybook/react';

import { TailwindComponent } from "./TailwindComponent";

const meta = {
    title: "Meta/Demo/TailwindComponent",
    component: TailwindComponent,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        changeableText: "This text changes",
    },
} satisfies Meta<typeof TailwindComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortSentence: Story = {
    args: {
        changeableText: "This one can however!",
    },
};

export const SmallParagraph: Story = {
    args: {
        changeableText: "This is a somewhat longer text because it is a paragraph. Paragraphs aren't limited to one sentence and they can be quite useful when writing some actual text. One shouldn't write a long text without breaking it up into paragraphs.",
    },
};