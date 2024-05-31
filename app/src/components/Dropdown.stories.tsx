import type { Meta, StoryObj } from '@storybook/react';
import DropDown from './Dropdown';
import XRWindow from './XRWindow';

const meta = {
  title: 'Components/DropDown',
  component: DropDown,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    options: ["Option 1", "Option 2", "Option 3"],
    selectedOption: "Option 1",
  },
} satisfies Meta<typeof DropDown>;

export default meta;


export const Default: StoryObj<typeof meta> = {

  render: (args) => {
    return (
      <XRWindow>
        <div className='flex flex-col items-center space-y-3'>
          <DropDown {...args} />
          <span>This is some text that is rendered below the dropdown. The intended behaviour is that the dropdown expands over this text.</span>
        </div>
      </XRWindow>
    );
  }

};