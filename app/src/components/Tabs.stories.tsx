import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';
import StoryHelper from '../StoryHelper';
import { Route } from '../hooks/useRoutingStore';

const meta: Meta<typeof Tabs> = {
  title: 'Windows/Tabs',
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    selectedRoute: Route.HOME,
    setSelectedRoute: (tab: Route) => { console.log("Selected: " + tab) }
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
