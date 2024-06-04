import { TabBar, TabBarItem } from './apfel/tab-bar'
import { Text } from '@react-three/uikit'
import { BoxSelect } from '@react-three/uikit-lucide'

import { HomeIcon, SettingsIcon, Tv2Icon, LayoutListIcon } from '@react-three/uikit-lucide';
import { ButtonType } from "./GlyphButtons";

import React from 'react';

/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-refresh/only-export-components
export enum Tab {
  HOME,
  TV,
  GUIDE,
  SETTINGS,
}

const getIcon = (tab: Tab) => {
  switch (tab) {
    case Tab.HOME:
      return ButtonType.Home;
    case Tab.TV:
      return ButtonType.TV;
    case Tab.GUIDE:
      return ButtonType.Guide;
    case Tab.SETTINGS:
      return ButtonType.Settings;
    default:
      return ButtonType.ChevronDown;
  }
}

export interface TabSelectorProps {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}


const Tabs: React.FC = () => {
  return (
    // Todo: Specify the height
    <TabBar defaultValue='Home' height={230}>
      <TabBarItem value='Home' icon={<HomeIcon />}>
        <Text>Home</Text>
      </TabBarItem>
      <TabBarItem value='TV' icon={<Tv2Icon />}>
        <Text>TV</Text>
      </TabBarItem>
      <TabBarItem value='Guide' icon={<LayoutListIcon />}>
        <Text>Guide</Text>
      </TabBarItem>
      <TabBarItem value='Settings' icon={<SettingsIcon />}>
        <Text>Settings</Text>
      </TabBarItem>
    </TabBar>
  );
};

export default Tabs;