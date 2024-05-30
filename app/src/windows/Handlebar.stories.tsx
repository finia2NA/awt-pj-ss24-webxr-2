import type { Meta, StoryObj } from '@storybook/react';
import Handlebar from './Handlebar';

const meta = {
  title: 'Windows/Handlebar',
  component: Handlebar,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    
  },
} as Meta<typeof Handlebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};

export const WithDot: Story = {
  args: {
    showDot: true,
  }
};

export const WithoutDot: Story = {
  args: {
    showDot: false,
  }
};