import type { Meta, StoryObj } from '@storybook/react';
import SettingsWindow from './SettingsWindow';
import StoryHelper from '../components/StoryHelper';

const meta: Meta<typeof SettingsWindow> = {
  title: 'windows/SettingsWindow',
  component: SettingsWindow,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: "Title",
    options: ["Option 1", "Option 2", "Option 3"],
    roundTop: false,
    roundBottom: false,
    selected: 0,
    onClick: (index: number) => console.log(index),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryHelper wide>
        <SettingsWindow {...args} />
      </StoryHelper>
    )
  }

};