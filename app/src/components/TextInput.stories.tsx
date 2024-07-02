import type { Meta, StoryObj } from '@storybook/react';
import StoryHelper from '../StoryHelper'
import TextInput from './TextInput';
import { Card } from './apfel/card';
import { useState } from 'react';


const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: "Type here...",
  },
} as Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {

    const [value, setValue] = useState("Type here...");

    return (
      <>
        <StoryHelper wide dynamicKeyboard>
          <Card alignSelf={"flex-start"} padding={6}>
            <TextInput {...args} value={value} setValue={setValue} onSearch={() => console.log("searching")} />
          </Card>
        </StoryHelper>
      </>
    );
  }
};