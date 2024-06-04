import type { Meta, StoryObj } from '@storybook/react';
import Tabs, { Tab } from './Tabs';
import StoryHelper from './StoryHelper';

const meta: Meta<typeof Tabs> = {
  title: 'Windows/Tabs',
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    collapsed: false,
    selectedTab: Tab.HOME,
    // eslint-disable-next-line no-unused-vars
    setSelectedTab: (tab: string) => { console.log("Selected: " + tab) }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

  render: (args) =>
    <>
      <StoryHelper>
        <Tabs {...args} />
      </StoryHelper >
    </>
};