import './App.css'

import { Fullscreen, Root } from '@react-three/uikit'
import BottomBar from './windows/BottomBar'
import GlyphButton, { ButtonType } from './components/GlyphButtons'
import { Tab } from './components/Tabs';



export interface TabSelectorProps {
  selectedTab: Tab;
  // eslint-disable-next-line no-unused-vars
  setSelectedTab: (tab: Tab) => void;
}


const ComponentAssembly = () => {
  return (
    <Fullscreen flexDirection="row" padding={10} gap={10}>
      <Root />
      <GlyphButton type={ButtonType.Home} />
      <BottomBar />
    </Fullscreen>
  );
};

export default ComponentAssembly;