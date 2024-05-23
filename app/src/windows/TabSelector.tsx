import GlyphButton, { ButtonType } from "../components/GlyphButtons";
import XRWindow from "../components/XRWindow";


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
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}

const TabSelector = (props: TabSelectorProps) => {
  const { collapsed, setCollapsed, selectedTab, setSelectedTab } = props;

  const Tabs = [
    Tab.HOME,
    Tab.TV,
    Tab.GUIDE,
    Tab.SETTINGS,
  ]


  return (
    <XRWindow small>
      <div className={`flex flex-col space-y-3 transition-all duration-300 ease-in-out delay-75 ${collapsed ? "h-11" : "h-52"}`}>
        <GlyphButton
          type={getIcon(Tabs[0])}
          active={!collapsed && selectedTab === Tabs[0]} // Check if the first tab is the selected one and it's not collapsed
          onClick={() => setCollapsed(!collapsed)}
          ignoreAnimation={true}
        />
        {!collapsed && Tabs.slice(1).map((tab, index) => (
          <GlyphButton
            key={index + 1} // Adjust index as we start from the second element
            type={getIcon(tab)}
            active={selectedTab === tab} // Check if the current tab is selected
            onClick={() => setSelectedTab(tab)}
          />
        ))}
      </div>
    </XRWindow>

  );
}

export default TabSelector;