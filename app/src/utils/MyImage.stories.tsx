import type { Meta, StoryObj } from '@storybook/react';
import MyImage from './MyImage';
import StoryHelper from '../StoryHelper';

const meta: Meta<typeof MyImage> = {
  title: 'Utils/MyImage',
  component: MyImage,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    src: "https://hbbtv-test.cbc.de/DVB-I/VOXHDLogo.png"
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) =>
    <>
      <StoryHelper>
        <MyImage {...args} />
      </StoryHelper >
    </>
};

export const NeedsCache: Story = {
  args: {
    src: "https://itv-api.ard.de/ardstart/img/services/28452.png"
  },
  render: (args) =>
    <>
      <StoryHelper>
        <MyImage {...args} />
      </StoryHelper >
    </>
};