import { TabBar, TabBarItem } from './apfel/tab-bar'
import { Text } from '@react-three/uikit'

import { HomeIcon, SettingsIcon, Tv2Icon, LayoutListIcon } from '@react-three/uikit-lucide';

import React from 'react';

/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-refresh/only-export-components
export enum Tab {
  HOME,
  TV,
  GUIDE,
  SETTINGS,
}

export interface TabSelectorProps {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}


const Tabs = ({ selectedTab, setSelectedTab }: TabSelectorProps) => {

  let currentValue;
  if (selectedTab === Tab.HOME) {
    currentValue = 'Home';
  } else if (selectedTab === Tab.TV) {
    currentValue = 'TV';
  } else if (selectedTab === Tab.GUIDE) {
    currentValue = 'Guide';
  } else if (selectedTab === Tab.SETTINGS) {
    currentValue = 'Settings';
  }

  // Todo: Specify the height
  return (
    <TabBar defaultValue='HOME' value={currentValue} height={230}
      onValueChange={(newValue) =>
        setSelectedTab(Tab[newValue as keyof typeof Tab])}
    >
      <TabBarItem value='HOME' icon={<HomeIcon />}>
        <Text>Home</Text>
      </TabBarItem>
      <TabBarItem value='TV' icon={<Tv2Icon />}>
        <Text>TV</Text>
      </TabBarItem>
      <TabBarItem value='GUIDE' icon={<LayoutListIcon />}>
        <Text>Guide</Text>
      </TabBarItem>
      <TabBarItem value='SETTINGS' icon={<SettingsIcon />}>
        <Text>Settings</Text>
      </TabBarItem>
    </TabBar>
  );
};

export default Tabs;