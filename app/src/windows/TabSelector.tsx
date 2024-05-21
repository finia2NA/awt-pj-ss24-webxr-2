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
      <div className="flex flex-col space-y-3">
        {collapsed ? (
          <GlyphButton type={getIcon(selectedTab)} active onClick={() => setCollapsed(false)} />
        ) : (
          Tabs.map((tab, index) => (
            <GlyphButton key={index} type={getIcon(tab)} active={selectedTab === index}
              onClick={() => setSelectedTab(tab)}
            />
          )))}
      </div>
    </XRWindow>

  );
}

export default TabSelector;