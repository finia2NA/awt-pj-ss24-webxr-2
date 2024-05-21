import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TabSelector, { Tab } from './TabSelector';

const meta: Meta<typeof TabSelector> = {
  title: 'Windows/TabSelector',
  component: TabSelector,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    collapsed: false,
    selectedTab: Tab.HOME,
    // eslint-disable-next-line no-unused-vars
    setCollapsed: () => { console.log("Clicked Collapse Toggle") },
    // eslint-disable-next-line no-unused-vars
    setSelectedTab: (tab) => { console.log("Selected: " + tab) }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};

export const Interactive: Story = {
  args: {
    collapsed: true,
    selectedTab: Tab.HOME,
  },

  render: (args) => {
    const [collapsed, setCollapsed] = useState(args.collapsed);
    const [selectedTab, setSelectedTab] = useState(args.selectedTab);

    return (
      <>
        <div className='flex flex-shrink'>
          <TabSelector
            {...args}
            collapsed={collapsed}
            selectedTab={selectedTab}
            setCollapsed={setCollapsed}
            setSelectedTab={setSelectedTab}
          />
        </div>
        <br />
        <button onClick={() => setCollapsed(!collapsed)}>Toggle Collapsed</button>
      </>
    );
  },

};