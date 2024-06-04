import './App.css'

import { Fullscreen, Root } from '@react-three/uikit'
import BottomBar from './components/BottomBar'
import GlyphButton, { ButtonType } from './components/GlyphButton'



export interface TabSelectorProps {
  selectedTab: Tab;
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