import type { Meta, StoryObj } from '@storybook/react';
import UIElement from './UIContainer';

const meta = {
  title: 'Components/UIContainer',
  component: UIElement,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: <><h1>Hello World</h1></>,
  },
} satisfies Meta<typeof UIElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};

export const RoundTop: Story = {
  args: {
    roundTop: true,
  },
};

export const RoundBottom: Story = {
  args: {
    roundBottom: true,
  },
};