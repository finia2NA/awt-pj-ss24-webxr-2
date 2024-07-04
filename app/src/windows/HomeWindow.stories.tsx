import type { Meta, StoryObj } from '@storybook/react';
import HomeWindow from './HomeWindow';
import StoryHelper from '../StoryHelper'


const meta = {
  title: 'Windows/HomeWindow',
  component: HomeWindow,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    hearted: [
      {
        name: "Channel 1",
        description: "Description 1",
        timeStart: "10:00",
        timeEnd: "11:00",
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Channel 2",
        description: "Description 2",
        timeStart: "11:00",
        timeEnd: "12:00",
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Channel 3",
        description: "Description 3",
        timeStart: "12:00",
        timeEnd: "13:00",
        imageUrl: "https://via.placeholder.com/150"
      }
    ],
    recent: [
      {
        name: "Channel 4",
        description: "Description 4",
        timeStart: "13:00",
        timeEnd: "14:00",
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Channel 5",
        description: "Description 5",
        timeStart: "14:00",
        timeEnd: "15:00",
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Channel 6",
        description: "Description 6",
        timeStart: "15:00",
        timeEnd: "16:00",
        imageUrl: "https://via.placeholder.com/150"
      }
    ]
  },
} as Meta<typeof HomeWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) =>
    <StoryHelper wide dynamicKeyboard>
      <HomeWindow {...args} />
    </StoryHelper>
};

export const Loading: Story = {
  render: (args) =>
    <StoryHelper wide dynamicKeyboard>
      <HomeWindow {...args} loading />
    </StoryHelper>
};