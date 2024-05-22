import type { Meta, StoryObj } from '@storybook/react';
import ButtonGroup from './ButtonGroup';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: "Title",
    options: ["Option 1", "Option 2", "Option 3"],
    selected: 0,
    onSelect: (index: number) => { console.log(index) },
  },
} as Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};