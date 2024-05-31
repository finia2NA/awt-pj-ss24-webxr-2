import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';
import XRWindow from './XRWindow';

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

  render: (args) => {

    return (
      <XRWindow>
        <div className='flex flex-col items-center space-y-3'>
          <Dropdown {...args} />
          <span>This is some text that is rendered below the dropdown. The intended behaviour is that the dropdown expands over this text.</span>
        </div>
      </XRWindow>
    );
  }
};