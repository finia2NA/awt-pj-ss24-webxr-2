import type { Meta, StoryObj } from '@storybook/react';
import UIElement from './UIElement';
import XRWindow from './XRWindow';

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

/** 
 * This is the default story that renders the UIElement component wrapped in an XRWindow component.
*/

export const Default: Story = {
  render: (args) => <XRWindow><UIElement {...args} /></XRWindow>,
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