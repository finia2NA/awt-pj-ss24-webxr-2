import type { Meta, StoryObj } from '@storybook/react';
import ButtonGroup from './ButtonGroup';
import StoryHelper from '../StoryHelper';

const meta: Meta<typeof ButtonGroup> = {
  title: 'components/Settings/ButtonGroup',
  component: ButtonGroup,
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
      <>
        <StoryHelper wide>
          <ButtonGroup {...args} />
        </StoryHelper>
      </>
    )
  }

};

export const RoundTop: Story = {
  args: {
    roundTop: true,
  },
  render: (args) => {
    return (
      <>
        <StoryHelper wide>
          <ButtonGroup {...args} />
        </StoryHelper>
      </>
    )
  }
};

export const RoundBottom: Story = {
  args: {
    roundBottom: true,
  },
  render: (args) => {
    return (
      <>
        <StoryHelper wide>
          <ButtonGroup {...args} />
        </StoryHelper>
      </>
    )
  }
};