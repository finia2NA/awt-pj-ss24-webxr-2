import type { Meta, StoryObj } from '@storybook/react';
import CacheEnabledImage from './CacheEnabledImage';
import StoryHelper from '../StoryHelper';

const meta: Meta<typeof CacheEnabledImage> = {
  title: 'Utils/MyImage',
  component: CacheEnabledImage,
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
        <CacheEnabledImage {...args} />
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
        <CacheEnabledImage {...args} />
      </StoryHelper >
    </>
};