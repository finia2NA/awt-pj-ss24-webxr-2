import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
  },
} as Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
    },
};