// RoundButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import RoundButton from './RoundButton';


const meta = {
  title: 'Components/RoundButton',
  component: RoundButton,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
  },
} satisfies Meta<typeof RoundButton>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    children: 'Button Text',
  },
};

export const Active: Story = {
  args: {
    children: 'Button Text',
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button Text',
    disabled: true,
  },
};

// export const Empty: Story = {
//   args: {
//     children: '',
//   },
// };