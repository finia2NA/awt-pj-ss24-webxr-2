import type { Meta, StoryObj } from '@storybook/react';
import XRWindow from './XRWindow';

const meta = {
  title: 'Components/XRWindow',
  component: XRWindow,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: <><h1>Hello World</h1> This is a test. <br /> The end 🙂‍↕️</>,
  },
} satisfies Meta<typeof XRWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};

export const Small: Story = {
  args: {
    small: true,
    children: <>Am small</>,
  },
};